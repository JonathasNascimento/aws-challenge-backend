import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './controllers/category/category.controller';
import { DeviceController } from './controllers/device/device.controller';
import { CategoryRepository } from './repositories/category/category.repository';
import { DeviceRepository } from './repositories/device/device.repository';
import { PrismaService } from './repositories/prisma/prisma.service';
import { CategoryService } from './services/category/category.service';
import { DeviceService } from './services/device/device.service';

@Module({
  imports: [],
  controllers: [AppController, DeviceController, CategoryController],
  providers: [
    AppService,
    DeviceService,
    DeviceRepository,
    PrismaService,
    CategoryService,
    CategoryRepository,
  ],
})
export class AppModule {}
