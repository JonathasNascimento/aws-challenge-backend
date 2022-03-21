import { Test, TestingModule } from '@nestjs/testing';
import { DeviceRepository } from 'src/repositories/device/device.repository';

import { createMockContext, MockContext } from '../../../test/context';
import { PrismaService } from '../../repositories/prisma/prisma.service';
import { DeviceService } from './device.service';

describe('DeviceService', () => {
  let service: DeviceService;
  let deviceService: DeviceService;
  let deviceRepository: DeviceRepository;
  let mockCtx: MockContext;
  let device;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceService, DeviceRepository, PrismaService],
    }).compile();

    service = module.get<DeviceService>(DeviceService);

    mockCtx = createMockContext();
    deviceRepository = new DeviceRepository(
      // eslint-disable-next-line prettier/prettier
      (mockCtx.prisma as unknown) as PrismaService,
    );

    deviceService = new DeviceService(deviceRepository);
    device = {
      id: 1,
      categoryId: 1,
      color: 'black',
      partNumber: 1,
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findDevices', () => {
    it('should fetch all devices', async () => {
      jest
        .spyOn(deviceRepository, 'findAll')
        .mockImplementation(() => Promise.resolve([device]));

      expect(await deviceService.findDevices()).toStrictEqual([{ ...device }]);
    });

    it('should fetch one device', async () => {
      jest.spyOn(deviceRepository, 'findById').mockImplementation(() => device);
      expect(await deviceService.findDeviceById(1)).toBe(device);
    });
  });

  describe('createDevice', () => {
    it('should create a device', async () => {
      jest
        .spyOn(deviceRepository, 'createNew')
        .mockImplementation(() => device);
      expect(await deviceService.createNewDevice(device)).toBe(device);
    });
  });
});
