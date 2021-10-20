import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { InviteEntity } from '@auth/entity/invite.entity';
import { InviteDto } from '@auth/dto/invite.dto';

@Injectable()
export class InviteMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(InviteEntity, InviteDto);
    };
  }
}
