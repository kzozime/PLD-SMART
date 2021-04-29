import { Body, Controller, Post } from '@nestjs/common';
import { MailingService } from './mailing.service';

@Controller('mailing')
export class MailingController {

    constructor(private mailingService: MailingService){}

    @Post()
    findAll(@Body() mailInfos: Mail): any {
        this.mailingService.sendMail(mailInfos.subject, mailInfos.email, mailInfos.code, mailInfos.username);
        return mailInfos.email+" "+mailInfos.code+" "+mailInfos.username;
    }
}

interface Mail {
    subject: string,
    email: string;
    code: string;
    username: string;
}
