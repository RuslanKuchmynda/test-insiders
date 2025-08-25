import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  tripCollaboratorsSchema,
  tripInvitesSchema,
  tripSchema,
  userSchema,
} from '@/db/schemas';
import { db } from '@/db/db';
import { and, eq, isNull } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer/dist/mailer.service';

@Injectable()
export class InviteService {
  constructor(private readonly mailer: MailerService) {}

  async createInvite(ownerId: string, tripId: string, email: string) {
    const [trip] = await db
      .select()
      .from(tripSchema)
      .where(eq(tripSchema.id, tripId));
    if (!trip) throw new NotFoundException('Trip not found');
    if (trip.ownerId !== ownerId) throw new ForbiddenException('Not the owner');

    const [user] = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, email));
    if (user && user.id === ownerId)
      throw new BadRequestException('You cannot invite yourself');

    const existing = await db
      .select()
      .from(tripInvitesSchema)
      .where(
        and(
          eq(tripInvitesSchema.tripId, tripId),
          eq(tripInvitesSchema.email, email),
          isNull(tripInvitesSchema.accepted),
        ),
      );
    if (existing.length > 0)
      throw new BadRequestException('Active invite already exists');

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const [invite] = await db
      .insert(tripInvitesSchema)
      .values({
        id: uuidv4(),
        tripId,
        email,
        token,
        expiresAt,
      })
      .returning();

    await this.mailer.sendMail({
      to: email,
      subject: `Invitation to collaborate on trip`,
      text: `You have been invited. Accept here: ${process.env.APP_URL}/api/invites/accept?token=${token}`,
    });

    return invite;
  }

  async acceptInvite(userId: string, token: string) {
    const [invite] = await db
      .select()
      .from(tripInvitesSchema)
      .where(eq(tripInvitesSchema.token, token));
    if (!invite) throw new NotFoundException('Invite not found');

    if (invite.expiresAt < new Date())
      throw new BadRequestException('Invite expired');
    if (invite.accepted || invite.canceled)
      throw new BadRequestException('Invite already used or cancelled');

    await db.insert(tripCollaboratorsSchema).values({
      id: uuidv4(),
      tripId: invite.tripId,
      userId,
      role: 'collaborator',
    });

    await db
      .update(tripInvitesSchema)
      .set({ accepted: new Date() })
      .where(eq(tripInvitesSchema.id, invite.id));

    return { success: true };
  }

  async cancelInvite(inviteId: string) {
    const [invite] = await db
      .select()
      .from(tripInvitesSchema)
      .where(eq(tripInvitesSchema.id, inviteId));
    if (!invite) throw new NotFoundException('Invite not found');

    const [trip] = await db
      .select()
      .from(tripSchema)
      .where(eq(tripSchema.id, invite.tripId));
    if (!trip) throw new NotFoundException('Trip not found');

    await db
      .update(tripInvitesSchema)
      .set({ canceled: true })
      .where(eq(tripInvitesSchema.id, inviteId));

    return { success: true };
  }
}
