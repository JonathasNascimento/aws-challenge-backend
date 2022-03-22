// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Category } from 'src/models/category';
import { CategoryService } from 'src/services/category/category.service';

import { HttpResponse } from '../http-response';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<HttpResponse<(Category | null)[]>> {
    const categories = await this.categoryService.findAllCategories();
    if (!categories || !categories.length) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        error: `Categories not found`,
      });
    }

    return Promise.resolve(new HttpResponse<(Category | null)[]>(categories));
  }

  @Get(':id')
  async findCategoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HttpResponse<Category | null>> {
    const category = await this.categoryService.findCategoryById(id);

    if (!category) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Category with id ${id} not found`,
      });
    }

    return Promise.resolve(new HttpResponse<Category | null>(category));
  }

  @Post()
  async createCategory(
    @Body() category: Category,
  ): Promise<HttpResponse<Category | null>> {
    const newCategory = await this.categoryService.createNewCategory(category);
    return Promise.resolve(new HttpResponse<Category | null>(newCategory));
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HttpResponse<Category | null>> {
    const category = await this.categoryService.deleteCategory(id);

    if (!category) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        error: `Could not delete category with id ${id}`,
      });
    }

    return Promise.resolve(new HttpResponse<Category | null>(category));
  }
}
