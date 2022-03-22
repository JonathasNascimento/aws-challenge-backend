import { Controller, Get } from '@nestjs/common';
import { Category } from 'src/models/category';
import { CategoryService } from 'src/services/category/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAllCategories(): Promise<(Category | null)[]> {
    return this.categoryService.findAllCategories();
  }
}
