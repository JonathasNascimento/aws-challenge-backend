import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
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
  async findDeviceById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Device | null> {
    const device = await this.deviceService.findDeviceById(id);

    if (!device) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        error: `Device with id ${id} not found`,
      });
    }

    return device;
  }

  @Post()
  createDevice(@Body() device: Device): Promise<Device | null> {
    return this.deviceService.createNewDevice(device);
  }

  @Delete(':id')
  deleteDevice(@Param('id', ParseIntPipe) id: number): Promise<Device | null> {
    return this.deviceService.deleteDevice(id);
  }
}
