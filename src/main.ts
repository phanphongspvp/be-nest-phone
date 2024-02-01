import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());

  // Sử dụng express.static để phục vụ tệp tĩnh từ thư mục 'uploads'
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.use(cors()); // Thêm dòng này để bật CORS

  await app.listen(4000);
}
bootstrap();
