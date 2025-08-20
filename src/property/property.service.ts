import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';
import { Model } from 'mongoose';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}
  async create(data: Property) {
    const result = await this.propertyModel.create(data);
    if (!result) {
      throw new NotFoundException('Property could not be created');
    }
    return { success: true, data: result };
  }
  async getAll() {
    return await this.propertyModel.find({});
  }
  async getSingle(id: string) {
    const result = await this.propertyModel
      .findById(id)
      .populate('ownerId', 'fullName email phoneNumber role');
    if (!result) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return result;
  }
  async getByOwnerId(ownerId: string) {
    return await this.propertyModel.find({ ownerId });
  }
  async getAllProductByIds(ids: string[]) {
    try {
      const properties = await this.propertyModel.find({ _id: { $in: ids } });

      if (!properties || properties.length === 0) {
        throw new NotFoundException('No properties found for the given IDs');
      }

      return { success: true, data: properties };
    } catch (error) {
      throw new NotFoundException('Error fetching properties by IDs');
    }
  }
}
