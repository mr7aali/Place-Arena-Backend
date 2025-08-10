import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // async register(userDto: any) {
  //   const existingUser = await this.usersService.getSingle(userDto.));
  //   if (existingUser) {
  //     throw new ConflictException('Email already exists');
  //   }
  //   const hashedPassword = await bcrypt.hash(userDto.password, 10);
  //   const user = await this.usersService.create({
  //     ...userDto,
  //     password: hashedPassword,
  //   });
  //   const { password, ...result } = user.toObject();
  //   return result;
  // }

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ email: string; role: string; userId: string }> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // const { password, ...result } = user;
      return {
        email: user.email,
        role: user.role,
        userId: user._id,
      };
    }
    throw new UnauthorizedException('Invalid credentials. Please Try again.');
  }

  async login(user: { email: string; role: string; userId: string }) {
    const payload = { email: user.email, sub: user.userId, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
