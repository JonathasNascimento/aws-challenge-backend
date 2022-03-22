import { Test, TestingModule } from '@nestjs/testing';

import { CategoryRepository } from './category.repository';

describe('CategoryService', () => {
  let repository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryRepository],
    }).compile();

    repository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
