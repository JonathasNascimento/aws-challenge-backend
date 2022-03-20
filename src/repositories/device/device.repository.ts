import { Injectable } from '@nestjs/common';
import { Device } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class DeviceRepository {
  constructor(private readonly prisma: PrismaService) { }

  findAll(): Promise<Device[]> {
    return this.prisma.device.findMany();
  }

  findById(id: number): Promise<Device> {
    return this.prisma.device.findUnique({ where: { id: +id } });
  }
}
