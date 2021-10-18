import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceEntity } from '@devices/entity/device.entity';
import { DeviceMapper } from '@devices/profile/device.mapper-profile';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity])],
  providers: [DevicesService, DeviceMapper],
  controllers: [DevicesController],
})
export class DevicesModule {}
