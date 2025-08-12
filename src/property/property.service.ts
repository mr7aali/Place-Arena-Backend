import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';
import { Model } from 'mongoose';
import { promises } from 'dns';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}
  async create(data: Property) {
    return await this.propertyModel.create(data);
  }
  async getAll() {
    return await this.propertyModel.find({});
  }
  async getSingle(id: string) {
    const result = await this.propertyModel.findById(id);
    if (!result) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return result;
  }
}
