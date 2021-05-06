import { Body, Controller, Post } from '@nestjs/common';
import { Mail } from 'src/dto/create-mail.dto';
import { MailingService } from './mailing.service';

@Controller('mailing')
export class MailingController {

    constructor(private mailingService: MailingService){}

    @Post()
    async findAll(@Body('subject') subject: string, @Body('email') mail: string,@Body('code') code:string,@Body('username') username:string): Promise<any> {
        console.log(subject);
        //console.log(mail['mailInfos']['subject']);
        this.mailingService.sendMail(subject, mail, code, username);

    }
}

