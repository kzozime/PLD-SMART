import { Body, Controller, Post } from '@nestjs/common';
import { Mail } from 'src/dto/create-mail.dto';
import { MailingService } from './mailing.service';

@Controller('mailing')
export class MailingController {

    constructor(private mailingService: MailingService){}

    @Post()
    async findAll(@Body() mailInfos: Mail): Promise<any> {
        var jsonToString = JSON.stringify(mailInfos);
        var mail = JSON.parse(jsonToString);
        console.log(mail.mailInfos.subject);
        //console.log(mail['mailInfos']['subject']);
        this.mailingService.sendMail(mail.mailInfos.subject, mail.mailInfos.email, mail.mailInfos.code, mail.mailInfos.username);
        return mail.mailInfos.email+" "+mail.mailInfos.code+" "+mail.mailInfos.username;
    }
}

