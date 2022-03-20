import { Test, TestingModule } from '@nestjs/testing';
import { DeviceRepository } from 'src/repositories/device/device.repository';

import { PrismaService } from '../../repositories/prisma/prisma.service';
import { DeviceService } from './device.service';

describe('DeviceService', () => {
  let service: DeviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceService, DeviceRepository, PrismaService],
    }).compile();

    service = module.get<DeviceService>(DeviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
