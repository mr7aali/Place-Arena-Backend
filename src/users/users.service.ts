import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto, OtpDto, VerifyOtpDto } from './dto/create-user-dto';
import { ConfigService } from '@nestjs/config';
import { PropertyService } from 'src/property/property.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private config: ConfigService,
    private readonly propertyService: PropertyService,
  ) {}

  async create(user: CreateUserDto): Promise<Users> {
    const isUserExist = await this.usersModel.findOne({ email: user.email });
    if (!!isUserExist) {
      throw new ConflictException('User with this email not exists.');
    }

    return await this.usersModel.create(user);
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
      throw new ConflictException('User not found.');
    }
    return result;
  }
  // async deleteUser(id: string): Promise<{ message: string }> {
  //   const resultUserDelete = await this.usersModel.findByIdAndDelete(id);
  //   const resultPropertyDelete =
  //     await this.propertyService.deleteAllPropertyOfUser(id);

  //   if (!resultPropertyDelete) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }
  //   return { message: 'User deleted successfully' };
  // }
  async deleteUser(id: string): Promise<{ message: string }> {
    const session = await this.usersModel.db.startSession();
    session.startTransaction();
    try {
      // Delete the user
      const resultUserDelete = await this.usersModel.findByIdAndDelete(id, {
        session,
      });
      if (!resultUserDelete) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // Delete all properties owned by the user
      const resultPropertyDelete =
        await this.propertyService.deleteAllPropertyOfUser({
          id: id,
          session: session,
        });

      // Commit transaction if both succeed
      await session.commitTransaction();
      return {
        message: `User and  properties deleted successfully`,
      };
    } catch (error) {
      // Rollback transaction if something fails
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
  async updateUser(id: string, updateData: Partial<Users>): Promise<Users> {
    const updatedUser = await this.usersModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }, // return updated doc, validate schema
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }
  async sendOtp({ phone, id }: OtpDto) {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expires = Date.now() + 5 * 60 * 1000; // 5 min expiry

    await this.usersModel.findByIdAndUpdate(id, {
      $set: { otp: { code, expires }, verified: false, phoneNumber: phone },
    });

    try {
      const url = `${this.config.get<string>('SMS_BASE_URL')}/sendtext?apikey=${this.config.get<string>('SMS_API_KEY')}&secretkey=${this.config.get<string>('SMS_SECRET_KEY')}&callerID=123&toUser=${phone}&messageContent=Welcome to Place Arena, your verification code is ${code}`;

      const response = await fetch(url, { method: 'GET' });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }
  async verifyOtp({ id, code }: VerifyOtpDto): Promise<boolean> {
    const user = await this.usersModel.findOne({ _id: id });
    if (!user?.otp || user.otp.expires < Date.now() || user.otp.code !== code) {
      return false;
    }
    await this.usersModel.updateOne(
      { _id: id },
      {
        $unset: { otp: 1 },
        $set: { verified: true },
      },
    );

    return true;
  }
  async checkStatus(messageId: string) {
    const url = `${this.config.get<string>('SMS_BASE_URL')}/getstatus?apikey=${this.config.get<string>('SMS_API_KEY')}&secretkey=${this.config.get<string>('SMS_SECRET_KEY')}&messageid=11720913`;
    const response = await fetch(url, { method: 'GET' });
    return response.json();
  }
}
