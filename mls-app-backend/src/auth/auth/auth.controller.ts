/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  connexion(
    @Body('emailUser') emailUser: string,
    @Body('passwordUser') passwordUser: string
  ): string {
    return this.authService.userConnection(emailUser, passwordUser);
  }
}
