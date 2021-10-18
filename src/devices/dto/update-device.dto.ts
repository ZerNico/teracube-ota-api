import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateDeviceDto {
  @ApiProperty({ example: 'device' })
  @IsString()
  @Length(1, 256)
  @IsOptional()
  @AutoMap()
  codename: string;

  @ApiProperty({ example: 'Example Device' })
  @IsString()
  @Length(1, 256)
  @IsOptional()
  @AutoMap()
  name: string;
}
