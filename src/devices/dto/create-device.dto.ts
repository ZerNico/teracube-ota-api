import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({ example: 'device' })
  @IsString()
  @Length(1, 256)
  @AutoMap()
  codename: string;

  @ApiProperty({ example: 'Example Device' })
  @IsString()
  @Length(1, 256)
  @AutoMap()
  name: string;
}
