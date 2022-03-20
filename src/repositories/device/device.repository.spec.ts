import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/repositories/prisma/prisma.service';

import { createMockContext, MockContext } from '../../../test/context';
import { DeviceRepository } from './device.repository';

describe('DeviceRepository', () => {
  let repository: DeviceRepository;
  let deviceRepository: DeviceRepository;
  let mockCtx: MockContext;
  let device;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceRepository, PrismaClient, PrismaService],
    }).compile();

    repository = module.get<DeviceRepository>(DeviceRepository);

    mockCtx = createMockContext();
    deviceRepository = new DeviceRepository(
      // eslint-disable-next-line prettier/prettier
      (mockCtx.prisma as unknown) as PrismaService,
    );

    device = {
      id: 1,
      categoryId: 1,
      color: 'black',
      partNumber: 1,
    };
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should not find a device', async () => {
    mockCtx.prisma.device.findUnique.mockResolvedValue(null);

    await expect(deviceRepository.findById(10)).resolves.toEqual(null);
  });

  it('should find a device', async () => {
    mockCtx.prisma.device.findUnique.mockResolvedValue(device);

    await expect(deviceRepository.findById(10)).resolves.toEqual({ ...device });
  });

  it('should fetch all devices', async () => {
    mockCtx.prisma.device.findMany.mockResolvedValue([device]);

    await expect(deviceRepository.findAll()).resolves.toEqual([{ ...device }]);
  });

  it('should create new device', async () => {
    mockCtx.prisma.device.create.mockResolvedValue(device);

    await expect(deviceRepository.createNew(device)).resolves.toEqual({
      ...device,
    });
  });
});
