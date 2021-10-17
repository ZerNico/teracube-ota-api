import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateDto } from '@updates/dto/update.dto';

export class DeviceDto {
  @ApiProperty({ example: 'device' })
  @AutoMap()
  codename: string;

  @ApiProperty({ example: 'Example Device' })
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap()
  updates: UpdateDto[];

  @ApiProperty()
  @AutoMap()
  createdAt: Date;

  @ApiProperty()
  @AutoMap()
  updatedAt: Date;
}
