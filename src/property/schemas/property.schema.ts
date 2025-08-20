import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PropertyDocument = Property & Document;

@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true })
  title: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  ownerId: string;
  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  rent: string;

  @Prop({ required: true })
  rooms: string;

  @Prop({ required: true })
  bathrooms: string;

  @Prop({ required: true })
  area: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  features: string[];

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({
    required: false,
    enum: ['approve', 'reject', 'pending'],
    default: 'pending',
  })
  status?: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
