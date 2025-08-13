import { Document } from 'mongoose';
export type PropertyDocument = Property & Document;
export declare class Property {
    title: string;
    location: string;
    type: string;
    rent: string;
    rooms: string;
    bathrooms: string;
    area: string;
    description: string;
    features: string[];
    ownerName: string;
    ownerPhone: string;
    ownerEmail: string;
    images: string[];
}
export declare const PropertySchema: import("mongoose").Schema<Property, import("mongoose").Model<Property, any, any, any, Document<unknown, any, Property, any, {}> & Property & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Property, Document<unknown, {}, import("mongoose").FlatRecord<Property>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Property> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
