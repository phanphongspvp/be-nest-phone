// src/headers/header.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Header } from './model/header.model';
import { HeaderDto } from './dto/header.dto';

@Injectable()
export class HeaderService {
  constructor(@InjectModel(Header.name) private headerModel: Model<Header>) {}

  async create(headerDto: HeaderDto): Promise<Header> {
    const createdHeader = new this.headerModel(headerDto);
    return createdHeader.save();
  }

  async findAll(): Promise<Header[]> {
    return this.headerModel.find().exec();
  }

  async findById(id: string): Promise<Header> {
    return this.headerModel.findById(id).exec();
  }

  async update(id: string, headerDto: HeaderDto): Promise<Header> {
    return this.headerModel
      .findByIdAndUpdate(id, headerDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Header> {
    return this.headerModel.findOneAndDelete({ _id: id }).exec();
  }
}
