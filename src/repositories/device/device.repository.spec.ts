import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/services/prisma/prisma.service';

import { DeviceRepository } from './device.repository';

describe('DeviceRepository', () => {
  let repository: DeviceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceRepository, PrismaService],
    }).compile();

    repository = module.get<DeviceRepository>(DeviceRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
