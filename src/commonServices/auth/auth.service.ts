import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user/user.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(payload: User) {
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
