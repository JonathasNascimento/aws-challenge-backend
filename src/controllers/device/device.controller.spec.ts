import { Test, TestingModule } from '@nestjs/testing';
import { DeviceRepository } from 'src/repositories/device/device.repository';
import { PrismaService } from 'src/repositories/prisma/prisma.service';
import { DeviceService } from 'src/services/device/device.service';

import { DeviceController } from './device.controller';

describe('DeviceController', () => {
  let controller: DeviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceController],
      providers: [DeviceService, DeviceRepository, PrismaService],
    }).compile();

    controller = module.get<DeviceController>(DeviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
