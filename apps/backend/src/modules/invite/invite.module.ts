import { Module } from '@nestjs/common';
import { InviteService } from '@/modules/invite/invite.service';
import { InviteController } from '@/modules/invite/invite.controller';
import { MailerModule } from '@/modules/mailer/mailer.module';

@Module({
  imports: [MailerModule],
  providers: [InviteService],
  controllers: [InviteController],
  exports: [InviteService],
})
export class InviteModule {}
