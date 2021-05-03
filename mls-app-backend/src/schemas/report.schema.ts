import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReportDocument = Report & Document;

@Schema()
export class Report {
  
  @Prop()
  latitude: number;

  @Prop()
  longitude: number;
  
  @Prop()
  idUser: string;

  @Prop()
  crimeType: string;

  @Prop()
  description: string;

  @Prop()
  date: Date;

}

export const ReportSchema = SchemaFactory.createForClass(Report);