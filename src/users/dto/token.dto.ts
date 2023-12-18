import { IsString, IsEmail, Length, IsJWT } from 'class-validator';

export class TokenDto {
  @IsString()
  token: string;
}
