import { Controller, Post, Body, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { JwtService } from 'src/jwt/jwt.service';

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
  async login(@Body(new ValidationPipe()) userDto: UserDto): Promise<any> {
    const { username, password } = userDto;

    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // If the user is found and credentials are valid, proceed with your logic (e.g., generate JWT token)
    // For example:
    const token = this.jwtService.generateToken(user); // Replace this with your token generation logic

    // Return whatever data you need for successful login (e.g., token, user info)
    return { token, user };
  }
}
