import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { Document } from 'mongoose';

export type UsersDocument = Users & Document;
@Schema({ timestamps: true })
export class Users {
  _id: string;
  @Prop({ required: false })
  fullName: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true, enum: ['admin', 'owner', 'tenant'] })
  role: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  phoneNumber: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
