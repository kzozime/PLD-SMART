/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Body, Controller, Get, Header, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from 'src/schemas/user.schema';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private jwtService: JwtService,
              @InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  @Post()
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
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

    const jwt = await this.jwtService.signAsync({id: user.email});

    response.cookie('jwt', jwt, {httpOnly : true});

    return user;
  }

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async getUser(@Req() request: Request){

    try {
      const cookie = request.cookies['jwt'];
      const cookieData = await this.jwtService.verifyAsync(cookie);

      if(!cookieData){
        throw new UnauthorizedException();
      }
      const user = await this.userModel.findOne({email: cookieData['id']});
      return user;
    } catch (error) {
      throw new UnauthorizedException();
      
    }

    
  }
}
