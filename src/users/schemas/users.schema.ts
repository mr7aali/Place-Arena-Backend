import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { Document } from 'mongoose';

export type UsersDocument = Users & Document;
@Schema({ timestamps: true })
export class Users {
  @Prop({ required: false })
  _id: string;
  @Prop({ required: false })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true, enum: ['admin', 'user'] })
  role: string;

  @Prop({ required: true })
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
