import { Module } from '@nestjs/common';
import { FooterController } from './footer.controller';
import { FooterService } from './footer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Footer, FooterSchema } from './model/footer.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Footer.name, schema: FooterSchema }]),
  ],
  controllers: [FooterController],
  providers: [FooterService]
})
export class FooterModule {}
