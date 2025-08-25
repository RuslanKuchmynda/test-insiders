import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { SignInDto } from '@/modules/auth/dto/sign-in.dto';
import { routes } from '@/common/routes';
import { SignUpDto } from '@/modules/auth/dto/sign-up.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(routes.signIn)
  async signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data.email, data.password);
  }

  @Post(routes.signUp)
  async signUp(@Body() data: SignUpDto) {
    return this.authService.signUp(data);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }
}
