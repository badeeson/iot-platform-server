import { IsString, IsEmail, Length } from 'class-validator';

export class UserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20) // Password length should be between 6 and 20 characters
  password: string;
}
