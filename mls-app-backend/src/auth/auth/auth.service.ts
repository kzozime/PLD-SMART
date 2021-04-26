import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';


@Injectable()
export class AuthService {
  constructor(@InjectConnection() private connection: Connection){}
  userConnection(mail: string, passwd: string): string {
    if (mail === 'aymen' && passwd === 'test') {
      return 'OK';
    } else {
      return 'NOT OK';
    }

    


  }
}
