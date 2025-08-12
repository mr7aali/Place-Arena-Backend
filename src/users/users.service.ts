import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}
  async create(user: CreateUserDto): Promise<Users> {
    const isUserExist = await this.usersModel.findOne({ email: user.email });
    if (!!isUserExist) {
      throw new ConflictException('User with this email already exists.');
    }

    const newUser = await this.usersModel.create(user);
    return newUser;
  }
  async getSingle(id: string): Promise<Users> {
    const result = await this.usersModel.findById(id);
    if (!result) {
      throw new NotFoundException('Not Found');
    }
    return result;
  }
  async getByEmail(email: string) {
    return await this.usersModel.findOne({ email: email });
  }
  async findByEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    return await this.usersModel
      .findOne({ email: email, password: password })
      .select('+password');
  }
  async getAllUser(): Promise<Users[]> {
    return await this.usersModel.find({});
  }
  async findByEmail(email: string): Promise<Users> {
    const result = await this.usersModel
      .findOne({ email: email })
      .select('+password');
    if (!result) {
      throw new ConflictException('User with this email already exists.');
    }
    return result;
  }
}
