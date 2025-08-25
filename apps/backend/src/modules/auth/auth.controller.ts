import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { SignInDto } from '@/modules/auth/dto/sign-in.dto';
import { SignUpDto } from '@/modules/auth/dto/sign-up.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data.email, data.password);
  }

  @Post('register')
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

  @Post('reset-password')
  async resetPassword(
    @Body()
    body: {
      token: string;
      newPassword: string;
      repeatPassword: string;
    },
  ) {
    return this.authService.resetPassword(
      body.token,
      body.newPassword,
      body.repeatPassword,
    );
  }
}
