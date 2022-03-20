import { Injectable } from '@nestjs/common';
import { Device } from '@prisma/client';
import { Device as DeviceModel } from 'src/models/device';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class DeviceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<DeviceModel[]> {
    const devices = await this.prisma.device.findMany();
    return Promise.all(devices.map(this.toDeviceModel));
  }

  async findById(id: number): Promise<DeviceModel> {
    const device = await this.prisma.device.findUnique({ where: { id: +id } });
    return Promise.resolve(this.toDeviceModel(device));
  }

  private toDeviceModel(device: Device): DeviceModel {
    const { id, categoryId, color, partNumber } = device;
    return { id, categoryId, color, partNumber };
  }
}
