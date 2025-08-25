import { Module } from "@nestjs/common";
import { AuthController } from "@/modules/auth/auth.controller";
import { AuthService } from "@/modules/auth/auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "@/modules/auth/jwt.strategy";
import {MailerModule} from "@/modules/mailer/mailer.module";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
    MailerModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
