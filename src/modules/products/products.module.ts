import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { Product, ProductModel } from './model/product.model';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from '../categories/categories.module';
import { ParseOptionalIntPipe } from './parse-optional-int.pipe';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductModel }]),CategoriesModule],
  controllers: [ProductController],
  providers: [ProductService,ParseOptionalIntPipe],
  exports: [ProductService],

})
export class ProductsModule { }
