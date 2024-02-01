// src/modules/categories/categories.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './model/categories.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(_id: string): Promise<Category> {
    return this.categoryModel.findOne({ _id }).exec();
  }

  async findCategoryByName(name: string): Promise<Category> {
    const result = await this.categoryModel.findOne({ name }).exec();
    return result;
  }

  async create(category: Category): Promise<Category> {
    const newCategory = await this.categoryModel.create(category);
    return newCategory;
  }

  async update(_id: string, updateData): Promise<Boolean> {
    const res = await this.categoryModel.findByIdAndUpdate(
      { _id },
      {
        ...updateData,
        updatedAt: new Date().getTime(),
      },
    );
    return !!res;
  }

  async delete(id: string): Promise<Category> {
    return this.categoryModel.findOneAndDelete({ _id: id }).exec();
  }

  async getProductsByCategory(categoryId: string) {
    const categoryWithProducts = await this.categoryModel
      .findById(categoryId)
      .populate({
        path: 'products',
        model: 'Product',
      })
      .exec();

    if (!categoryWithProducts) {
      throw new Error('Danh mục không tồn tại');
    }
    return categoryWithProducts.products;
  }

  async findById(id) {
    const res = await this.categoryModel.findById({ _id: id }).exec();
    return res;
  }

  async find(query) {
    const result = await this.categoryModel.find(query).exec();
    return result;
  }
}
