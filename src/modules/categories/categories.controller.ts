// src/modules/categories/categories.controller.ts
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './model/categories.model';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get()
    findAll(): Promise<Category[]> {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Category> {
        return this.categoriesService.findOne(id);
    }

    @Post()
    async create(@Body() category: Category): Promise<Category> {
        const existingCategory = await this.categoriesService.findCategoryByName(category.name)
        if (existingCategory) {
            throw new HttpException('Danh mục tồn tại', HttpStatus.CONFLICT);
        }

        return this.categoriesService.create(category);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() category: Category): Promise<Boolean> {
        const existingCategory = await this.categoriesService.findOne(id)
        if (!existingCategory) {
            throw new HttpException('Danh mục tồn tại', HttpStatus.CONFLICT);
        }
        return this.categoriesService.update(id, category);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Category> {
        const existingCategory = await this.categoriesService.findOne(id)
        if (!existingCategory) {
            throw new Error('Danh mục k tồn tại');
        }
        return this.categoriesService.delete(id);
    }

    @Get(':id/products')
    getProductsByCategory(@Param('id') id: string) {
        return this.categoriesService.getProductsByCategory(id);
    }

}
