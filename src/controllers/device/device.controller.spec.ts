import { Test, TestingModule } from '@nestjs/testing';
import { DeviceRepository } from 'src/repositories/device/device.repository';
import { PrismaService } from 'src/repositories/prisma/prisma.service';
import { DeviceService } from 'src/services/device/device.service';

import { DeviceController } from './device.controller';

describe('DeviceController', () => {
  let controller: DeviceController;
  let service: DeviceService;
  let device;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceController],
      providers: [DeviceService, DeviceRepository, PrismaService],
    }).compile();

    controller = module.get<DeviceController>(DeviceController);
    service = module.get<DeviceService>(DeviceService);

    device = {
      id: 1,
      categoryId: 1,
      color: 'black',
      partNumber: 1,
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findDevices', () => {
    it('should fetch all devices', async () => {
      jest
        .spyOn(service, 'findDevices')
        .mockImplementation(() => Promise.resolve([device]));
      expect(await controller.findDevices()).toStrictEqual([{ ...device }]);
    });

    it('should fetch one device', async () => {
      jest.spyOn(service, 'findDeviceById').mockImplementation(() => device);
      expect(await controller.findDeviceById(1)).toBe(device);
    });
  });

  describe('createDevice', () => {
    it('should create one device', async () => {
      jest.spyOn(service, 'createNewDevice').mockImplementation(() => device);
      expect(await controller.createDevice(device)).toBe(device);
    });
  });

  describe('deleteDevice', () => {
    it('should delete a device', async () => {
      jest.spyOn(service, 'deleteDevice').mockImplementation(() => device);
      expect(await controller.deleteDevice({ params: { id: 1 } })).toBe(device);
    });
  });
});
