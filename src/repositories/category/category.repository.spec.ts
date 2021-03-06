import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeviceService } from 'src/services/device/device.service';

import { createMockContext, MockContext } from '../../../test/context';
import { DeviceRepository } from '../device/device.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryRepository } from './category.repository';

describe('CategoryRepository', () => {
  let repository: CategoryRepository;
  let categoryRepository: CategoryRepository;
  let mockCtx: MockContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryRepository,
        DeviceRepository,
        PrismaService,
        DeviceService,
        PrismaClient,
      ],
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

    it('should fetch one category', async () => {
      mockCtx.prisma.category.findUnique.mockResolvedValue({
        id: 1,
        name: 'smarthphone',
      });
      await expect(categoryRepository.findById(1)).resolves.toEqual({
        id: 1,
        name: 'smarthphone',
      });
    });
  });

  describe('create category', () => {
    it('should create new category', async () => {
      mockCtx.prisma.category.create.mockResolvedValue({
        id: 1,
        name: 'smarthphone',
      });
      await expect(
        categoryRepository.createNew({ id: 1, name: 'smarthphone' }),
      ).resolves.toEqual({ id: 1, name: 'smarthphone' });
    });
  });

  describe('delete category', () => {
    it('should delete a category', async () => {
      mockCtx.prisma.category.delete.mockResolvedValue({
        id: 1,
        name: 'smarthphone',
      });

      await expect(categoryRepository.delete(1)).resolves.toEqual({
        id: 1,
        name: 'smarthphone',
      });
    });
  });
});
