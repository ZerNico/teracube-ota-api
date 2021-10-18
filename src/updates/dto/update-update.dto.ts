import { AutoMap } from '@automapper/classes';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUpdateDto {
  @ApiProperty({ example: 'update.zip', required: false })
  @IsString()
  @IsOptional()
  @AutoMap()
  filename: string;

  @ApiProperty({
    example: 'https://example.com/downloads/update.zip',
    required: false,
  })
  @IsUrl()
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
  @IsOptional()
  @AutoMap()
  type: string;
}
