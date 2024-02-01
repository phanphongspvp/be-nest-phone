import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          callback(null, file.fieldname + '-' + uniqueSuffix + extension);
        },
      }),
    }),
  )
  uploadSingle(@UploadedFile() file) {
    console.log(file);
  }

  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('photo', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          callback(null, file.fieldname + '-' + uniqueSuffix + extension);
        },
      }),
    }),
  )
  async uploadMultiple(@UploadedFiles() files) {
    const uploadInputs = files.map((file) => file.path);
    const images = {
      image: uploadInputs,
    };
    const res = await this.uploadService.create(images);
    return res;
  }
}

// {
//     fieldname: 'photo',
//     originalname: 'chàng nước.png',
//     encoding: '7bit',
//     mimetype: 'image/png',
//     destination: './uploads',
//     filename: 'photo-1705893048756-517084579.png',
//     path: 'uploads\\photo-1705893048756-517084579.png',
//     size: 599117
//   }
