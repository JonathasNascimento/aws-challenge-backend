import { Injectable } from '@nestjs/common';
import { Device } from '@prisma/client';
import { Device as DeviceModel } from 'src/models/device';
import { PrismaService } from 'src/repositories/prisma/prisma.service';

@Injectable()
export class DeviceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<(DeviceModel | null)[]> {
    const devices = await this.prisma.device.findMany();
    return Promise.all(devices.map(this.toDeviceModel));
  }

  async findById(id: number): Promise<DeviceModel | null> {
    const device = await this.prisma.device.findUnique({ where: { id: +id } });
    return Promise.resolve(this.toDeviceModel(device));
  }

  async createNew(device: DeviceModel) {
    const newDevice = await this.prisma.device.create({ data: device });
    return Promise.resolve(this.toDeviceModel(newDevice));
  }

  async delete(id: number) {
    let device: Device | null;

    try {
      device = this.toDeviceModel(
        await this.prisma.device.delete({ where: { id: +id } }),
      );
    } catch (error) {
      device = null;
    }

    return Promise.resolve(device);
  }

  private toDeviceModel(device: Device | null): DeviceModel | null {
    if (device === null) {
      return null;
    }

    const { id, categoryId, color, partNumber } = device;
    return { id, categoryId, color, partNumber };
  }
}
