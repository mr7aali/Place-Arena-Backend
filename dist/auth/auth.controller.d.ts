import { AuthService } from './auth.service';
import type { Response } from 'express';
import { LoginUserDto } from './dto/login-user-dto';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    login(loginDto: LoginUserDto, res: Response): Promise<{
        accessToken: string;
        test: string | undefined;
    }>;
    register(userDto: CreateUserDto, res: Response): Promise<{
        accessToken: string;
    }>;
    getProfile(req: any): any;
    refresh(req: any): Promise<{
        accessToken: string;
    }>;
    logout(): {
        message: string;
    };
}
