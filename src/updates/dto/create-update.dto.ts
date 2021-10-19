import { AutoMap } from '@automapper/classes';
import { IsNumber, IsOptional, IsString, IsUrl, Length, Matches, Max, Min } from 'class-validator';
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
  @AutoMap()
  timestamp: number;

  @ApiProperty({ example: '1.0' })
  @IsString()
  @Length(1, 256)
  @AutoMap()
  version: string;

  @ApiProperty({ example: 676675831 })
  @IsNumber()
  @AutoMap()
  size: number;

  @ApiProperty({ example: 'release' })
  @IsString()
  @Length(1, 256)
  @AutoMap()
  type: string;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(0)
  @Max(100)
  @AutoMap()
  percentage: number;

  @ApiProperty({ example: '8fa0a420-09d4-4e80-b326-21c6e2bed2e1' })
  @IsString()
  @Length(1, 256)
  @IsOptional()
  @AutoMap()
  stagedId: string;
}
