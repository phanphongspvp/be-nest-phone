import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Upload, UploadModel } from './model/upload.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Upload.name, schema: UploadModel }])],
  providers: [UploadService],
  controllers: [UploadController]
})
export class UploadModule {}
