import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailer: NestMailerService) {}

  async sendMail(options: { to: string; subject: string; text: string }) {
    return this.mailer.sendMail(options);
  }
}
