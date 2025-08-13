import { Users, UsersDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';
export declare class UsersService {
    private usersModel;
    constructor(usersModel: Model<UsersDocument>);
    create(user: CreateUserDto): Promise<Users>;
    getSingle(id: string): Promise<Users>;
    getByEmail(email: string): Promise<(import("mongoose").Document<unknown, {}, UsersDocument, {}, {}> & Users & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    findByEmailAndPassword({ email, password, }: {
        email: string;
        password: string;
    }): Promise<(import("mongoose").Document<unknown, {}, UsersDocument, {}, {}> & Users & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    getAllUser(): Promise<Users[]>;
    findByEmail(email: string): Promise<Users>;
}
