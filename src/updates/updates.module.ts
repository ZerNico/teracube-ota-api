import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateEntity } from './entity/update.entity';
import { UpdatesService } from './updates.service';
import { UpdatesController } from './updates.controller';
import { UpdateMapper } from './profile/update.mapper-profile';
import { DevicesService } from '@devices/devices.service';
import { DeviceEntity } from '@devices/entity/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UpdateEntity, DeviceEntity])],
  providers: [UpdatesService, UpdateMapper, DevicesService],
  exports: [UpdatesService],
  controllers: [UpdatesController],
})
export class UpdatesModule {}
