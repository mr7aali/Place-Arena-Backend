import { CreatePropertyDto } from './dto/create-property-dto';
import { PropertyService } from './property.service';
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    crate(createPropertyDto: CreatePropertyDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument, {}, {}> & import("./schemas/property.schema").Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument, {}, {}> & import("./schemas/property.schema").Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getSingle(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument, {}, {}> & import("./schemas/property.schema").Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
