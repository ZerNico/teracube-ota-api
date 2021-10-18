import { AutoMap } from '@automapper/classes';
import { IsNumber, IsString, IsUrl, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateDto {
  @ApiProperty({ example: 'device1' })
  @IsString()
  @AutoMap()
  codename: string;

  @ApiProperty({ example: 'update.zip' })
  @IsString()
  @Length(1, 256)
  @AutoMap()
  filename: string;

  @ApiProperty({ example: 'https://example.com/downloads/update.zip' })
  @IsUrl()
  @Length(1, 256)
  @AutoMap()
  url: string;

  @ApiProperty({ example: 1634476631 })
  @IsNumber()
  @Length(1, 256)
  @AutoMap()
  timestamp: number;

  @ApiProperty({ example: '1.0' })
  @IsString()
  @Length(1, 256)
  @AutoMap()
  version: string;

  @ApiProperty({ example: 676675831 })
  @IsNumber()
  @Length(1, 256)
  @AutoMap()
  size: number;

  @ApiProperty({ example: 'release' })
  @IsString()
  @Length(1, 256)
  @AutoMap()
  type: string;
}
