import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from 'src/schemas/report.schema';
import { MapController } from './map.controller';
import { MapService } from './map.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }])],
    controllers: [MapController],
    providers: [MapService],
})
export class MapModule {}
