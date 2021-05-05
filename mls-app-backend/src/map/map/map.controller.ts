import { BadGatewayException, Body, Controller, Get, Post } from '@nestjs/common';
import { CreateReportDto } from 'src/dto/create-report.dto';
import { Report } from 'src/schemas/report.schema';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
    constructor(private readonly mapService: MapService) { }

    @Post('report')
    async createReport(@Body() createReportDto: CreateReportDto) {
        const report = await this.mapService.reportCrime(createReportDto);
        if(!report){
            throw new BadGatewayException('bad arguments for report');
        }
        console.log('new report created !');
        return {'success' : true};
    }

    @Get('report')
    async getReports(): Promise<Report[]> {
        console.log('test map/report');
        return this.mapService.getReports();
    }
}
