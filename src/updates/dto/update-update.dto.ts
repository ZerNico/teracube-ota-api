import { AutoMap } from '@automapper/classes';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUpdateDto {
  @IsString()
  @IsOptional()
  @AutoMap()
  filename: string;

  @IsString()
  @IsOptional()
  @AutoMap()
  url: string;

  @IsNumber()
  @IsOptional()
  @AutoMap()
  timestamp: number;

  @IsString()
  @IsOptional()
  @AutoMap()
  version: string;

  @IsNumber()
  @IsOptional()
  @AutoMap()
  size: number;

  @IsString()
  @IsOptional()
  @AutoMap()
  type: string;
}
