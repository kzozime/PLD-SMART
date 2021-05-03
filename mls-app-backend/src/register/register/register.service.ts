import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from "src/dto/create-user.dto";
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    createdUser.inviteCode = "MLS-"+createdUser._id ;
    const salt = await bcrypt.genSalt();
    createdUser.password = await bcrypt.hash(createdUser.password, salt);
    console.log(createdUser);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
