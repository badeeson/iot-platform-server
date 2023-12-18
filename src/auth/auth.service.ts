import { Injectable } from '@nestjs/common';
import { User } from '../users/interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/entities/user.entity';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(user: UserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }
}
