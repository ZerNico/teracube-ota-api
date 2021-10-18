import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { DeviceEntity } from '@devices/entity/device.entity';
import { DeviceDto } from '@devices/dto/device.dto';

@Injectable()
export class DeviceMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(DeviceEntity, DeviceDto);
    };
  }
}
