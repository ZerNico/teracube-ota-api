import { AutoMap } from '@automapper/classes';
import { IsNumber, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateDto {
  @ApiProperty({ example: 'update.zip' })
  @IsString()
  @AutoMap()
  filename: string;

  @ApiProperty({ example: 'https://example.com/downloads/update.zip' })
  @IsUrl()
  @AutoMap()
  url: string;

  @ApiProperty({ example: 1634476631 })
  @IsNumber()
  @AutoMap()
  timestamp: number;

  @ApiProperty({ example: '1.0' })
  @IsString()
  @AutoMap()
  version: string;

  @ApiProperty({ example: 676675831 })
  @IsNumber()
  @AutoMap()
  size: number;

  @ApiProperty({ example: 'release' })
  @IsString()
  @AutoMap()
  type: string;
}
