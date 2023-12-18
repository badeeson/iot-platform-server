import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { User } from '../users/interfaces/user.interface';
import { UserPayload } from '../users/interfaces/user-pay-load.interface';

@Injectable()
export class JwtService {
  // private readonly privateKey = crypto.randomBytes(32).toString('hex');
  private readonly privateKey = 'PAca23mBorOo34j1230-fAsDasFodpoL';

  generateToken(user: User): string {
    const { id, username, email } = user;
    return jwt.sign({ id, username, email }, this.privateKey, { expiresIn: '1h' });
  }

  verifyToken(token: string): User | null {
    try {
      const decoded = jwt.verify(token, this.privateKey) as UserPayload;
      const { id, username, email } = decoded;
      return { id, username, email } as User;
    } catch (error) {
      console.error(error)
      return null;
    }
  }

  getPrivateKey(): string {
    return this.privateKey;
  }

}
