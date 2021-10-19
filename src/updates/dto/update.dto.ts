import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDto {
  @ApiProperty({ example: '25b309d0-d5c1-4305-b74e-64197f4eef06' })
  @AutoMap()
  id: string;

  @ApiProperty({ example: 'update.zip' })
  @AutoMap()
  filename: string;

  @ApiProperty({ example: 'https://example.com/downloads/update.zip' })
  @AutoMap()
  url: string;

  @ApiProperty({ example: 1634476631 })
  @AutoMap()
  timestamp: number;

  @ApiProperty({ example: '1.0' })
  @AutoMap()
  version: string;

  @ApiProperty({ example: 676675831 })
  @AutoMap()
  size: number;

  @ApiProperty({ example: 'release' })
  @AutoMap()
  type: string;

  @ApiProperty({ example: 'device1' })
  @AutoMap()
  codename: string;

  @ApiProperty({ example: 50 })
  @AutoMap()
  percentage: number;

  @ApiProperty({ example: '8fa0a420-09d4-4e80-b326-21c6e2bed2e1' })
  @AutoMap()
  stagedId: string;

  @ApiProperty({ example: 7 })
  @AutoMap()
  allowedCount: number;

  @ApiProperty({ example: 5 })
  @AutoMap()
  deniedCount: number;

  @ApiProperty()
  @AutoMap()
  createdAt: Date;

  @ApiProperty()
  @AutoMap()
  updatedAt: Date;
}
