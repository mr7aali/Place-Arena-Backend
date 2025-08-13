import { CreateUserDto } from './dto/create-user-dto';
import { Users } from './schemas/users.schema';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    crate(createUserDto: CreateUserDto): Promise<Users>;
    getSingle(id: string): Promise<Users>;
    getAllUser(): Promise<Users[]>;
}
