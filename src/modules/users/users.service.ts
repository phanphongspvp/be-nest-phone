// user.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(inputCreateUser): Promise<User> {
    const user = await this.userModel.create(inputCreateUser);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async findUserById(id) {
    return this.userModel.findOne({ _id: id }).exec();
  }
}
