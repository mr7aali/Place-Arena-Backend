import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(userDto: CreateUserDto) {
    const existingUser = await this.usersService.getByEmail(userDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.usersService.create({
      ...userDto,
      password: hashedPassword,
    });
    return user;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ email: string; role: string; userId: string }> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        email: user.email,
        role: user.role,
        userId: user._id,
      };
    }
    throw new UnauthorizedException('Invalid credentials. Please Try again.');
  }

  async login(user: {
    email: string;
    role: string;
    userId: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { email: user.email, sub: user.userId, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '120d',
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      }),

      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '300d',
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      }),
    };
  }

  async refreshTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '30s',
        secret: process.env.JWT_ACCESS_SECRET,
      }),
    };
  }
  async signWithGooglePopup(userDto: CreateUserDto) {
    const existingUser = await this.usersService.getByEmail(userDto.email);
    if (existingUser) {
      const payload = {
        email: existingUser.email,
        sub: existingUser._id,
        role: existingUser.role,
      };
      return {
        accessToken: this.jwtService.sign(payload, {
          expiresIn: '120d',
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        }),

        refreshToken: this.jwtService.sign(payload, {
          expiresIn: '300d',
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        }),
      };
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.usersService.create({
      ...userDto,
      password: hashedPassword,
    });
    const payload = {
      email: user.email,
      sub: user._id,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '120d',
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      }),

      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '300d',
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      }),
    };
  }
}
