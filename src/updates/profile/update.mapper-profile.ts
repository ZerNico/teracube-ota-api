import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { UpdateEntity } from '../entity/update.entity';
import { UpdateDto } from '../dto/update.dto';

@Injectable()
export class UpdateMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(UpdateEntity, UpdateDto);
    };
  }
}
