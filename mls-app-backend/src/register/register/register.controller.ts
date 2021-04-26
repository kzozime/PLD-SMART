import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/schemas/user.schema';
import { RegisterService } from './register.service';


@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.registerService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.registerService.findAll();
  }
}
