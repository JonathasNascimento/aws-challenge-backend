import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Device } from 'src/models/device';
import { DeviceService } from 'src/services/device/device.service';

import { HttpResponse } from '../http-response';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  async findDevices(): Promise<HttpResponse<(Device | null)[]>> {
    const devices = await this.deviceService.findDevices();

    if (!devices || !devices.length) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        error: `Devices not found`,
      });
    }

    return Promise.resolve(new HttpResponse<(Device | null)[]>(devices));
  }

  @Get(':id')
  async findDeviceById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HttpResponse<Device>> {
    const device = await this.deviceService.findDeviceById(id);

    if (!device) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        error: `Device with id ${id} not found`,
      });
    }

    return Promise.resolve(new HttpResponse<Device>(device));
  }

  @Post()
  async createDevice(
    @Body() device: Device,
  ): Promise<HttpResponse<Device | null>> {
    const newDevice = await this.deviceService.createNewDevice(device);
    return Promise.resolve(new HttpResponse<Device | null>(newDevice));
  }

  @Delete(':id')
  async deleteDevice(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HttpResponse<Device | null>> {
    const device = await this.deviceService.deleteDevice(id);

    if (!device) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        error: `Could not delete device with id ${id}`,
      });
    }

    return Promise.resolve(new HttpResponse<Device | null>(device));
  }
}
