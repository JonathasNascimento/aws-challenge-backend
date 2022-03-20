import { Injectable } from '@nestjs/common';
import { Device } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) { }

  findDevices(): Promise<Device[]> {
    return this.prisma.device.findMany();
  }

  findDeviceById(id: number): Promise<Device> {
    return this.prisma.device.findUnique({ where: { id } });
  }
}
