import { Injectable } from '@nestjs/common';
import { Category as CategoryModel } from 'src/models/category';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<CategoryModel[]> {
    return Promise.resolve([]);
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
}
