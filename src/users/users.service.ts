import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}
  async create(user: CreateUserDto): Promise<string> {
    const isUserExist = await this.usersModel.findOne({ email: user.email });

    return Promise.resolve('hello');
  }
  // async getUsers(): string {}
}
