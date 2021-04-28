import { Controller, Get } from '@nestjs/common';
import { MailingService } from './mailing.service';

@Controller('mailing')
export class MailingController {

    constructor(private mailingService: MailingService){}

    @Get()
    findAll(): any {
        this.mailingService.sendMail();
        return 'coucou';
    }
}
