import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';

import { createMockContext, MockContext } from '../../../test/context';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryRepository } from './category.repository';

describe('CategoryRepository', () => {
  let repository: CategoryRepository;
  let categoryRepository: CategoryRepository;
  let mockCtx: MockContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryRepository, PrismaService, PrismaClient],
    }).compile();

    repository = module.get<CategoryRepository>(CategoryRepository);

    mockCtx = createMockContext();
    categoryRepository = new CategoryRepository(
      // eslint-disable-next-line prettier/prettier
      (mockCtx.prisma as unknown) as PrismaService,
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should fetch all categories', async () => {
      mockCtx.prisma.category.findMany.mockResolvedValue([
        { id: 1, name: 'smarthphone' },
      ]);
      await expect(categoryRepository.findAll()).resolves.toEqual([
        { id: 1, name: 'smarthphone' },
      ]);
    });
  });
});
