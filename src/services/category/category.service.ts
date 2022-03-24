import { Injectable } from '@nestjs/common';
import { Category } from 'src/models/category';
import { CategoryRepository } from 'src/repositories/category/category.repository';

import { DeviceService } from '../device/device.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly deviceService: DeviceService,
  ) {}

  findAllCategories(): Promise<(Category | null)[]> {
    return this.categoryRepository.findAll();
  }

  findCategoryById(id: number): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }

  createNewCategory(category: Category): Promise<Category | null> {
    return this.categoryRepository.createNew(category);
  }

  async deleteCategory(id: number): Promise<Category | null> {
    // prettier-ignore
    const totalOfDevices = await this.deviceService.countDevicesByCategoryId(id);
    const categoryHasDevices = totalOfDevices > 0;

    if (categoryHasDevices) {
      throw new Error(
        'Could not delete this category because it still contains devices',
      );
    }

    return this.categoryRepository.delete(id);
  }
}
