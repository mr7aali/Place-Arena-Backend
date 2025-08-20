import { CreatePropertyDto } from './dto/create-property-dto';
import { PropertyService } from './property.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async crate(@Body() createPropertyDto: CreatePropertyDto) {
    console.log(createPropertyDto);
    return await this.propertyService.create(createPropertyDto);
  }
  @Get()
  async getAll() {
    return await this.propertyService.getAll();
  }
  @Get(':id')
  async getSingle(@Param('id') id: string) {
    return await this.propertyService.getSingle(id);
  }
  @Get('owner/:ownerId')
  async getByOwnerId(@Param('ownerId') ownerId: string) {
    return await this.propertyService.getByOwnerId(ownerId);
  }
  @Post('by-ids')
  async getPropertiesByIds(@Body('ids') ids: string[]) {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new BadRequestException('Ids array is required in request body');
    }

    return this.propertyService.getAllProductByIds(ids);
  }
}
