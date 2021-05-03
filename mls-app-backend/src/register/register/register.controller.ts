import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/schemas/user.schema';
import { RegisterService } from './register.service';


@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @Header('Access-Control-Allow-Origin', '*')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.registerService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.registerService.findAll();
  }
  
}
