import { AutoMap } from '@automapper/classes';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUpdateDto {
  @ApiProperty({ example: 'update.zip', required: false })
  @IsString()
  @Length(1, 256)
  @IsOptional()
  @AutoMap()
  filename: string;

  @ApiProperty({
    example: 'https://example.com/downloads/update.zip',
    required: false,
  })
  @IsUrl()
  @Length(1, 256)
  @IsOptional()
  @AutoMap()
  url: string;

  @ApiProperty({ example: 1634476631, required: false })
  @IsNumber()
  @IsOptional()
  @AutoMap()
  timestamp: number;

  @ApiProperty({ example: '1.0', required: false })
  @IsString()
  @Length(1, 256)
  @IsOptional()
  @AutoMap()
  version: string;

  @ApiProperty({ example: 676675831, required: false })
  @IsNumber()
  @IsOptional()
  @AutoMap()
  size: number;

  @ApiProperty({ example: 'release', required: false })
  @IsString()
  @Length(1, 256)
  @IsOptional()
  @AutoMap()
  type: string;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  @AutoMap()
  percentage: number;

  @ApiProperty({ example: '8fa0a420-09d4-4e80-b326-21c6e2bed2e1' })
  @IsString()
  @Length(1, 256)
  @IsOptional()
  @AutoMap()
  stagedId: string;
}
