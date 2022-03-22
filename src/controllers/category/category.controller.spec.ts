import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from 'src/repositories/category/category.repository';
import { PrismaService } from 'src/repositories/prisma/prisma.service';
import { CategoryService } from 'src/services/category/category.service';

import { CategoryController } from './category.controller';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, CategoryRepository, PrismaService],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
