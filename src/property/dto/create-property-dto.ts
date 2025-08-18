import { IsArray, IsString } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  ownerId: string;

  @IsString()
  title: string;

  @IsString()
  location: string;

  @IsString()
  type: string;

  @IsString()
  rent: string;

  @IsString()
  rooms: string;

  @IsString()
  bathrooms: string;

  @IsString()
  area: string;

  @IsString()
  description: string;

  @IsArray()
  features: string[];

  @IsArray()
  images: string[];
}
