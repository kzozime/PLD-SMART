import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';
import { RegisterModule } from './register/register/register.module';

@Module({
  imports: [AuthModule,
            RegisterModule,
     MongooseModule.forRoot(
       'mongodb+srv://admin:PLD-SMART@mls-cluster.6ykob.mongodb.net/MLS-App'
       )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
