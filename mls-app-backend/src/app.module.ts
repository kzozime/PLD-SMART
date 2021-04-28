import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';
import { RegisterModule } from './register/register/register.module';
import { MapModule } from './map/map/map.module';
import { MailingService } from './mailing/mailing.service';
import { MailingController } from './mailing/mailing.controller';

@Module({
  imports: [AuthModule,
            RegisterModule,
            MapModule,
     MongooseModule.forRoot(
       'mongodb+srv://admin:PLD-SMART@mls-cluster.6ykob.mongodb.net/MLS-App'
       ,{ useNewUrlParser: true, useCreateIndex: true })],
  
  controllers: [AppController, MailingController],
  providers: [AppService, MailingService],
})
export class AppModule {}
