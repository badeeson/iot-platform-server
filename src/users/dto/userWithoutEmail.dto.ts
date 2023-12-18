import { IsString, Length } from 'class-validator';

export class UserWithoutEmailDto {
  @IsString()
  username: string;

  @IsString()
  @Length(6, 20) // Password length should be between 6 and 20 characters
  password: string;
}
