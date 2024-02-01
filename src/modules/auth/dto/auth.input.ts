// user.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsString,
  IsNumber,
} from 'class-validator';

export class AuthLoginInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
