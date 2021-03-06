import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}
  
  //Async function which searches a user who has this credentials and returns it 
  async userConnection(mail: string, passwd: string): Promise<User> {

    console.log(mail);
    const user = await this.userModel.findOne({email: mail}).catch(() => console.log("not found"));
    if (user && await bcrypt.compare(passwd, user.password)){
      console.log("user exists and password correct ! ");
      console.log(user);
      return user;
    }else{
      console.log("user does not exist or password incorrect ! ");
      return undefined;
    }

  }
}
