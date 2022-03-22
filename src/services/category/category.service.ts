import { Injectable } from '@nestjs/common';
import { Category } from 'src/models/category';
import { CategoryRepository } from 'src/repositories/category/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  findAllCategories(): Promise<(Category | null)[]> {
    return this.categoryRepository.findAll();
  }
}
