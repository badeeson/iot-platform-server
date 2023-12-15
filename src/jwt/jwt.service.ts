import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { User } from '../users/interfaces/user.interface';
import { UserPayload } from '../users/interfaces/user-pay-load.interface';

@Injectable()
export class JwtService {
  private readonly privateKey = crypto.randomBytes(32).toString('hex');

  generateToken(user: User): string {
    const { id, username, email } = user;
    return jwt.sign({ id, username, email }, this.privateKey, { expiresIn: '1h' }); // Token expires in 1 hour
  }

  verifyToken(token: string): User | null {
    try {
      const decoded = jwt.verify(token, this.privateKey) as UserPayload;
      const { id, username, email } = decoded;
      return { id, username, email } as User;
    } catch (error) {
      return null;
    }
  }

  getPrivateKey(): string {
    return this.privateKey;
  }

}
