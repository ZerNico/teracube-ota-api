import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class InviteDto {
  @ApiProperty({ example: '25b309d0-d5c1-4305-b74e-64197f4eef06' })
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  createdAt: Date;

  @ApiProperty()
  @AutoMap()
  updatedAt: Date;
}
