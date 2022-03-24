import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from 'src/repositories/category/category.repository';
import { DeviceRepository } from 'src/repositories/device/device.repository';
import { PrismaService } from 'src/repositories/prisma/prisma.service';
import { CategoryService } from 'src/services/category/category.service';
import { DeviceService } from 'src/services/device/device.service';

import { CategoryController } from './category.controller';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
        DeviceService,
        DeviceRepository,
        CategoryRepository,
        PrismaService,
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
