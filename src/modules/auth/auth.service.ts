import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { envConfig } from 'src/configs/database';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(_id: string): Promise<any> {
    const user = await this.userService.findUserById(_id);
    return null;
  }

  async makeAccessToken(user: any) {
    const payload = { username: user.name, sub: user._id };
    return {
      id: user._id,
      access_token: this.jwtService.sign(payload, {
        privateKey: envConfig.AUTH_JWT_SECRET,
        expiresIn: envConfig.JWT_TOKEN_EXPIRE_IN,
      }),
    };
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
