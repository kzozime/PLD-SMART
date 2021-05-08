/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Body, Controller, Get, Header, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from 'src/schemas/user.schema';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              @InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  @Post()
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  //Async function which returns the connected user
  async login(
    @Body('emailUser') emailUser: string,
    @Body('passwordUser') passwordUser: string,
    @Res({passthrough: true}) response: Response
    
  ): Promise<User> {
    
    console.log(emailUser, passwordUser);
    const user = await this.authService.userConnection(emailUser, passwordUser);

    if(!user) {
      throw new BadRequestException('invalide credentials');
    }

    return user;
  }
}
