import { Controller, Get, Param } from '@nestjs/common';
import { Device } from 'src/models/device';
import { DeviceService } from 'src/services/device/device.service';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  findDevices(): Promise<(Device | null)[]> {
    return this.deviceService.findDevices();
  }

  @Get(':id')
  findDeviceById(@Param() params): Promise<Device | null> {
    return this.deviceService.findDeviceById(params.id);
  }
}
