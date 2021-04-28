/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Header, Post } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Header('Access-Control-Allow-Origin', '*')
  connexion(
    @Body('emailUser') emailUser: string,
    @Body('passwordUser') passwordUser: string
    
  ): Promise<User | undefined> {
    
    return this.authService.userConnection(emailUser, passwordUser);
  }
}
