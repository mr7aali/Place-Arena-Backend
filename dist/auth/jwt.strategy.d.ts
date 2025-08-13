import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(payload: any): Promise<(import("mongoose").Document<unknown, {}, import("../users/schemas/users.schema").UsersDocument, {}, {}> & import("../users/schemas/users.schema").Users & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
}
export {};
