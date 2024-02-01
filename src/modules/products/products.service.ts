// product.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './model/product.model';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async createProduct(product: Product): Promise<Product> {
    const createdProduct = await this.productModel.create(product);
    const _idCategory = String(product.category);
    const category = await this.categoriesService.findById(_idCategory);

    if (category) {
      await this.categoriesService.update(_idCategory, {
        $push: { products: createdProduct._id },
      });
    }

    return createdProduct;
  }

  async updateProduct(_id: string, updatedProduct: Product): Promise<Boolean> {
    const existingProduct = await this.productModel.findById(_id).exec();

    if (!existingProduct) {
      throw new NotFoundException('Product not found.');
    }

    const update = await this.productModel.updateOne(
      { _id },
      {
        ...updatedProduct,
        updatedAt: new Date().getTime(),
      },
    );
    return !!update;
  }

  async deleteProduct(id: string): Promise<Boolean> {
    const existingProduct = await this.productModel.findById(id).exec();

    if (!existingProduct) {
      throw new NotFoundException('Product not found.');
    }

    const result = await this.productModel.deleteOne({ _id: id }).exec();
    return true;
  }

  async getProductById(id: string): Promise<Product> {
    return await this.productModel.findById(id).populate('category').exec();
  }

  async getAllProductsByCategory(id): Promise<Product[]> {
    const products = await this.productModel.find({ category: id }).exec();
    return products;
  }

  async paginateProducts(
    page: number = 1,
    pageSize: number = 10,
    searchTerm: string = '',
    minPrice?: number,
    maxPrice?: number,
    category: string = '',
  ): Promise<any> {
    let query: any = {};

    if (searchTerm !== '') {
      query.name = new RegExp(searchTerm, 'i');
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) {
        query.price.$gte = minPrice;
      }
      if (maxPrice !== undefined) {
        query.price.$lte = maxPrice;
      }
    }

    if (category !== undefined && category !== '') {
      // Xử lý tìm kiếm theo name và category
      const categoryIds =
        await this.categoriesService.findCategoryByName(category);
      query.category = categoryIds._id.toString();
    }
    const products = await this.productModel.find(query).exec();
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      products: products.slice(start, end),
      pagination: {
        page,
        pageSize,
        totalItems,
        totalPages,
      },
    };
  }

  async findAll() {
    const products = await this.productModel.find().exec();
    return products;
  }
  
}
