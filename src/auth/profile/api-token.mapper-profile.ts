import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { ApiTokenEntity } from '@auth/entity/api-token.entity';
import { ApiTokenDto } from '@auth/dto/api-token.dto';
import { mapFrom } from '@automapper/core';

@Injectable()
export class ApiTokenMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(ApiTokenEntity, ApiTokenDto).forMember(
        (destination) => destination.token,
        mapFrom((source) => source.token.slice(0, 10)),
      );
    };
  }
}
