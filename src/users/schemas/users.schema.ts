import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { Document } from 'mongoose';

export type UsersDocument = Users & Document;
@Schema({ timestamps: true })
export class Users {
  _id: string;
  @Prop({ required: false })
  fullName: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true, enum: ['admin', 'owner', 'tenant'] })
  role: string;
  @Prop({ required: true, select: false })
  password: string;
  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ type: { code: String, expires: Number } })
  otp?: { code: string; expires: number };

  @Prop({ required: false, type: Boolean })
  verified?: boolean;

  @Prop({ required: false })
  profileImage?: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
