import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDto } from 'src/dto/create-report.dto';
import { Report, ReportDocument } from 'src/schemas/report.schema';

@Injectable()
export class MapService {
    constructor(
        @InjectModel(Report.name) private readonly reportModel: Model<ReportDocument>,
    ) {}

    async reportCrime(createReportDto: CreateReportDto): Promise<Report> {
        const createdReport = new this.reportModel(createReportDto); 
        return createdReport.save();
      }

      async getReports(): Promise<Report[]> {
        return this.reportModel.find().exec();
      }
}
