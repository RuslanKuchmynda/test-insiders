import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { InviteService } from '@/modules/invite/invite.service';

@Controller('invites')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createInvite(
    @Req() req: { user: { id: string } },
    @Body() body: { tripId: string; email: string },
  ) {
    const { tripId, email } = body;
    return this.inviteService.createInvite(req.user.id, tripId, email);
  }

  @Get('accept')
  async acceptInvite(@Query('token') token: string) {
    const testUserId = 'test-user-id';
    return this.inviteService.acceptInvite(testUserId, token);
  }
  @Get('cancel')
  async cancelInvite(@Query('token') token: string) {
    return this.inviteService.cancelInvite(token);
  }
}
