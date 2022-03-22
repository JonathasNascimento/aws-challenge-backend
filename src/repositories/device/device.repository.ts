import { Injectable } from '@nestjs/common';
import { Device } from '@prisma/client';
import { Device as DeviceModel } from 'src/models/device';
import { PrismaService } from 'src/repositories/prisma/prisma.service';

@Injectable()
export class DeviceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<(DeviceModel | null)[]> {
    const devices = await this.prisma.device.findMany({
      include: {
        category: {
          select: { name: true },
        },
      },
    });
    return Promise.all(devices);
  }

  async findById(id: number): Promise<DeviceModel | null> {
    const device = await this.prisma.device.findUnique({
      where: { id: +id },
      include: {
        category: true,
      },
    });
    return Promise.resolve(device);
  }

  async createNew(device: DeviceModel) {
    const newDevice = await this.prisma.device.create({ data: device });
    return Promise.resolve(newDevice);
  }

  async delete(id: number) {
    let device: Device | null;

    try {
      device = await this.prisma.device.delete({ where: { id: +id } });
    } catch (error) {
      device = null;
    }

    return Promise.resolve(device);
  }
}
