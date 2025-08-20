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

  // @Get()
  // getUsers(): Promise<string> {
  //   return this.userService.getUsers();
  // }

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
}
