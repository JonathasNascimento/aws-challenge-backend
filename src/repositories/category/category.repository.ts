import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { Category as CategoryModel } from 'src/models/category';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<(CategoryModel | null)[]> {
    const categories = await this.prisma.category.findMany();
    return Promise.all(categories.map(this.toCategoryModel));
  }

  findById(): Promise<CategoryModel | null> {
    return Promise.resolve(null);
  }

  createNew(): Promise<CategoryModel | null> {
    return Promise.resolve(null);
  }

  delete(): Promise<CategoryModel | null> {
    return Promise.resolve(null);
  }

  private toCategoryModel(category: Category): CategoryModel | null {
    if (!category) {
      return null;
    }

    const { id, name } = category;
    return { id, name };
  }
}
