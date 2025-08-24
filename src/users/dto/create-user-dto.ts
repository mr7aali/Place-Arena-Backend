import { IsEmail, IsEnum, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['owner', 'tenant', 'admin'])
  role: string;

  @IsPhoneNumber()
  phoneNumber: string;
}

export class OtpDto {
  @IsString()
  id: string;
  @IsString()
  phone: string;
}

export class VerifyOtpDto {
  @IsString()
  id: string;

  @IsString()
  code: string;
}
