import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserInput } from '../users/dto/user.input';
import { UserService } from '../users/users.service';
import { comparePassword, hashString } from '../utils/auth';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './auth/google-oauth.guard';
import { AuthLoginInput } from './dto/auth.input';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() createUserInput: CreateUserInput) {
    const inputCreateUser = {
      ...createUserInput,
      password: hashString(createUserInput.password),
    };
    return this.userService.createUser(inputCreateUser);
  }

  @Post('login')
  async login(@Body() authLoginInput: AuthLoginInput) {
    const { email, password } = authLoginInput;
    const user = await this.userService.findUserByEmail(email);
    
    if (!user) {
      throw new HttpException('Not found User', HttpStatus.CONFLICT);
    }
    if (!comparePassword(password, user.password)) {
      throw new HttpException('Incorrect password', HttpStatus.CONFLICT);
    }
    return this.authService.makeAccessToken(user);
  }

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }
}
