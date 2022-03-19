import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeviceController } from './controllers/device/device.controller';

@Module({
  imports: [],
  controllers: [AppController, DeviceController],
  providers: [AppService],
})
export class AppModule {}
