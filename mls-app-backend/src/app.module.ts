import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule,
     MongooseModule.forRoot(
       'mongodb://admin:PLD-SMART@mls-cluster.6ykob.mongodb.net/MLS-App?retryWrites=true&w=majority'
       )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
