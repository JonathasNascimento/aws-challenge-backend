import { Injectable } from '@nestjs/common';
import { Device } from 'src/models/device';
import { DeviceRepository } from 'src/repositories/device/device.repository';

@Injectable()
export class DeviceService {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  findDevices(): Promise<(Device | null)[]> {
    return this.deviceRepository.findAll();
  }

  findDeviceById(id: number): Promise<Device | null> {
    return this.deviceRepository.findById(id);
  }

  countDevicesByCategoryId(categoryId: number): Promise<number> {
    return this.deviceRepository.countByCategoryId(categoryId);
  }

  createNewDevice(device: Device): Promise<Device | null> {
    return this.deviceRepository.createNew(device);
  }

  deleteDevice(id: number): Promise<Device | null> {
    return this.deviceRepository.delete(id);
  }
}
