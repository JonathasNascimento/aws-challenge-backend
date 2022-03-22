import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from 'src/repositories/category/category.repository';
import { PrismaService } from 'src/repositories/prisma/prisma.service';

import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryRepository, CategoryService, PrismaService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
