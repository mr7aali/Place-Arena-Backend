import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @Get()
  // getUsers(): Promise<string> {
  //   return this.userService.getUsers();
  // }

  @Post()
  crate(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
