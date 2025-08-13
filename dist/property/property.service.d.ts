import { Property, PropertyDocument } from './schemas/property.schema';
import { Model } from 'mongoose';
export declare class PropertyService {
    private propertyModel;
    constructor(propertyModel: Model<PropertyDocument>);
    create(data: Property): Promise<import("mongoose").Document<unknown, {}, PropertyDocument, {}, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, PropertyDocument, {}, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getSingle(id: string): Promise<import("mongoose").Document<unknown, {}, PropertyDocument, {}, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
