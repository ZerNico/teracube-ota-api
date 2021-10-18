import { AutoMap } from '@automapper/classes';
import { IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';
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
  @Length(1, 256)
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
  @Length(1, 256)
  @IsOptional()
  @AutoMap()
  size: number;

  @ApiProperty({ example: 'release', required: false })
  @IsString()
  @Length(1, 256)
  @IsOptional()
  @AutoMap()
  type: string;
}
