import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertyDocument = Property & Document;

@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true })
  title: string;

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

  @Prop({ required: true })
  ownerName: string;

  @Prop({ required: true })
  ownerPhone: string;

  @Prop({ required: true })
  ownerEmail: string;

  @Prop({ type: [String], required: true })
  images: string[];
}

export const PropertySchema = SchemaFactory.createForClass(Property);
