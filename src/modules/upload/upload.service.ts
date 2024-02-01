import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Upload } from './model/upload.model';

@Injectable()
export class UploadService {
    constructor(@InjectModel('Upload') private readonly uploadModel: Model<Upload>) { }

    async create(uploadInput) {        
      const id = await this.uploadModel.create(uploadInput)
      return id
    }
}
