import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(userDto: CreateUserDto): Promise<import("../users/schemas/users.schema").Users>;
    validateUser(email: string, password: string): Promise<{
        email: string;
        role: string;
        userId: string;
    }>;
    login(user: {
        email: string;
        role: string;
        userId: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(userId: string, email: string, role: string): Promise<{
        accessToken: string;
    }>;
}
