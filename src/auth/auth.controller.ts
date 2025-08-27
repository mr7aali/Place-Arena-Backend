import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { LoginUserDto } from './dto/login-user-dto';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { JwtAuthGuard } from './jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @Post('login')
  async login(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    const result = await this.authService.login(user);
    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    };
  }
  @Post('signup-with-google')
  async signWithGooglePopup(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signWithGooglePopup(user);
    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    };
  }

  @Post('register')
  async register(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.register(userDto);
    const result = await this.authService.login({
      email: user.email,
      role: user.role,
      userId: user._id,
    });
    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });
    return { accessToken: result.accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return {
      success: true,
      message: 'User profile fetched successfully',
      data: req.user,
    };
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refresh(@Req() req) {
    try {
      return await this.authService.refreshTokens(
        req.user.sub,
        req.user.email,
        req.user.role,
      );
    } catch (error) {
      console.error('Error during token refresh:', error);
      throw new UnauthorizedException('Failed to refresh tokens');
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return { message: 'Logged out successfully' };
  }
}
