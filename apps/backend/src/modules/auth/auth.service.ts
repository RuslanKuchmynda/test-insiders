import {Injectable, BadRequestException, NotFoundException} from "@nestjs/common";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { userSchema } from "@/db/schemas";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "@/modules/auth/dto/sign-up.dto";
import { comparePassword, hashPassword } from "@/common/bcrypt.funcs";
import { WithId} from "@interfaces/with-id";
import { UserLogin } from "@interfaces/user";
import { v4 as uuidv4 } from "uuid";
import {MailerService} from "@/modules/mailer/mailer.service";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private readonly mailer: MailerService ) {}

  private async sendVerifyEmail(userId: string) {
    const [user] = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.id, userId));

    if (!user) throw new NotFoundException("User not found");
    if (user.isEmailVerified) throw new BadRequestException("Email already verified");

    const token = uuidv4();

    await db.update(userSchema)
      .set({ emailVerifyToken: token })
      .where(eq(userSchema.id, userId));

    await this.mailer.sendMail({
      to: user.email,
      subject: "Verify your email",
      text: `Click to verify: ${process.env.APP_URL}/auth/verify-email?token=${token}`,
    });

    return { message: "Verification email sent" };
  }

  generateToken(user: WithId<UserLogin>) {
    const accessToken = this.jwtService.sign(
      { id: user.id, email: user.email },
      { expiresIn: "1d" }
    );
    return { accessToken };
  }

  async signIn(email: string, password: string) {
    const user = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, email))
      .limit(1);
    if (user.length === 0) {
      throw new BadRequestException("User not found");
    }

    const isValid = await comparePassword(password, user[0].password);
    if (!isValid) throw new BadRequestException("Invalid credentials");

    const token = this.generateToken(user[0]);

    return { message: "Logged in successfully", data: { ...token } };
  }

  async signUp(data: SignUpDto) {
    if (data.password !== data.repeatPassword) {
      throw new BadRequestException("Passwords do not match");
    }

    const existingUser = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, data.email));
    if (existingUser.length > 0) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    const [newUser] = await db
      .insert(userSchema)
      .values({
        id: uuidv4(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        role: "user" as const,
      })
      .returning();

    await this.sendVerifyEmail(newUser.id);

    const token = this.generateToken(newUser);

    return { message: "Registered and logged in successfully", token };
  }

  async verifyEmail(token: string) {
    const [user] = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.emailVerifyToken, token));

    if (!user) throw new BadRequestException("Invalid or expired token");

    await db.update(userSchema)
      .set({ isEmailVerified: true, emailVerifyToken: null })
      .where(eq(userSchema.id, user.id));

    return { message: "Email verified successfully" };
  }

  async forgotPassword(email: string) {
    const [user] = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, email));

    if (!user) throw new NotFoundException("User not found");

    const token = uuidv4();

    await db.update(userSchema)
      .set({
        passwordResetToken: token,
        passwordResetExpires: new Date(Date.now() + 3600_000), // 1 година
      })
      .where(eq(userSchema.id, user.id));

    await this.mailer.sendMail({
      to: email,
      subject: "Reset your password",
      text: `Reset your password: ${process.env.APP_URL}/auth/reset-password?token=${token}`,
    });

    return { message: "Password reset email sent" };
  }
}
