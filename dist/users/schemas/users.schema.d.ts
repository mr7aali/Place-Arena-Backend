import type { Document } from 'mongoose';
export type UsersDocument = Users & Document;
export declare class Users {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    password: string;
    phoneNumber: string;
}
export declare const UsersSchema: import("mongoose").Schema<Users, import("mongoose").Model<Users, any, any, any, Document<unknown, any, Users, any, {}> & Users & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Users, Document<unknown, {}, import("mongoose").FlatRecord<Users>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Users> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
