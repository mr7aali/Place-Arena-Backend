import { CreateUserDto } from './dto/create-user-dto';
import { Users } from './schemas/users.schema';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async crate(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get(':id')
  async getSingle(@Param('id') id: string): Promise<Users> {
    return await this.userService.getSingle(id);
  }
  @Get()
  async getAllUser() {
    return await this.userService.getAllUser();
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<Users>,
  ): Promise<Users> {
    return this.userService.updateUser(id, updateData);
  }
  @Post('otp')
  async sendOtp(@Body() body: { phone: string; id: string }) {
    return this.userService.sendOtp({ phone: body.phone, id: body.id });
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { id: string; code: string }) {
    const verified = await this.userService.verifyOtp({
      id: body.id,
      code: body.code,
    });

    return { verified };
  }
}
