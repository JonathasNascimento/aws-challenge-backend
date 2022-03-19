import { Injectable } from '@nestjs/common';
import { Category } from 'src/models/category';
import { Device } from 'src/models/device';

@Injectable()
export class DeviceService {
  findDevices(): [Device] {
    const device = new Device();
    device.id = 1;
    device.category = new Category();
    device.color = 'black';
    device.partNumber = 1;

    return [device];
  }

  findDeviceById(deviceId: number): Device {
    const device = new Device();
    device.id = 1;
    device.category = new Category();
    device.color = 'black';
    device.partNumber = 1;

    return device;
  }
}
