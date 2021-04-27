import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  
  @Prop({required: true, type: String})
  firstName: string;

  @Prop({required: true, type: String})
  lastName: string;

  @Prop({required: true, type: Date})
  dateOfBirth: string;

  @Prop({required: true, type: String, unique: true})
  email: string;

  @Prop({required: true, type: String})
  password: string;

  @Prop({required: true, type: Number})
  nbInvitation: number;

  @Prop({type: String, unique: true})
  inviteCode: string

  @Prop({required: true, type: Boolean})
  verified: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);