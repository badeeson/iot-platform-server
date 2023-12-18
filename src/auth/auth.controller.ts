import { Controller, Post, Body, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { UserWithoutEmailDto } from 'src/users/dto/userWithoutEmail.dto';
import { TokenDto } from 'src/users/dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}
  
  @Post('register')
  async register(@Body(new ValidationPipe()) userDto: UserDto): Promise<any> {
    return await this.authService.register(userDto);
  }

  @Post('login')
  async login(
    @Body(new ValidationPipe()) userWithoutEmailDto: UserWithoutEmailDto
  ): Promise<any> {
    const { username, password } = userWithoutEmailDto;

    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = this.jwtService.generateToken(user);

    return { token, user };
  }

  @Post('verify')
  async verify(@Body(new ValidationPipe()) tokenDto: TokenDto): Promise<any> {
    const { token } = tokenDto;
    const isValid = this.jwtService.verifyToken(token);
    if (!isValid) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return { isValid: true };
  }
}
