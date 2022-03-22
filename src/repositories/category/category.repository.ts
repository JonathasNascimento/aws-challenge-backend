import { Injectable, Logger } from '@nestjs/common';
import { Category } from '@prisma/client';
import { Category as CategoryModel } from 'src/models/category';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  private readonly logger = new Logger(CategoryRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<(CategoryModel | null)[]> {
    const categories = await this.prisma.category.findMany();
    return Promise.resolve(categories.map(this.toCategoryModel));
  }

  async findById(id: number): Promise<CategoryModel | null> {
    const category = await this.prisma.category.findUnique({
      where: { id: +id },
    });
    return Promise.resolve(this.toCategoryModel(category));
  }

  async createNew(category: CategoryModel): Promise<CategoryModel | null> {
    const newCategory = await this.prisma.category.create({ data: category });
    return Promise.resolve(newCategory);
  }

  async delete(id: number): Promise<CategoryModel | null> {
    let category: Category | null;

    try {
      category = this.toCategoryModel(
        await this.prisma.category.delete({ where: { id: +id } }),
      );
    } catch (error) {
      this.logger.error(error);
      category = null;
    }

    return Promise.resolve(category);
  }

  private toCategoryModel(category: Category | null): CategoryModel | null {
    if (!category) {
      return null;
    }

    const { id, name } = category;
    return { id, name };
  }
}
