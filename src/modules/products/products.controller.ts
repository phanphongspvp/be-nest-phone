// product.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Product } from './model/product.model';
import { ParseOptionalIntPipe } from './parse-optional-int.pipe';
import { ProductService } from './products.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() product: Product): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updatedProduct: Product,
  ): Promise<Boolean> {
    return this.productService.updateProduct(id, updatedProduct);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<Boolean> {
    return this.productService.deleteProduct(id);
  }

  @Get('product')
  async getListProduct(): Promise<Product[]> {
    const res = await this.productService.findAll();
    return res;
  }

  @Get(':id')
  getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Get('category/:id')
  async getProductsByCategory(
    @Param('id') categoryId: string,
  ): Promise<Product[]> {
    const products =
      await this.productService.getAllProductsByCategory(categoryId);
    return products;
  }

  @Get()
  async getProducts(
    @Query('page', ParseOptionalIntPipe) page: number = 1,
    @Query('pageSize', ParseOptionalIntPipe) pageSize: number = 10,
    @Query('searchTerm') searchTerm: string = '',
    @Query('minPrice', ParseOptionalIntPipe) minPrice: number | undefined,
    @Query('maxPrice', ParseOptionalIntPipe) maxPrice: number | undefined,
    @Query('category') category: string = '',
  ) {
    const paginatedProducts = await this.productService.paginateProducts(
      page,
      pageSize,
      searchTerm,
      minPrice,
      maxPrice,
      category,
    );
    return paginatedProducts;
  }
}
