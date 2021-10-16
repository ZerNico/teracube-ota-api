import { AutoMap } from '@automapper/classes';
import { IsNumber, IsString } from 'class-validator';

export class CreateUpdateDto {
  @IsString()
  @AutoMap()
  filename: string;

  @IsString()
  @AutoMap()
  url: string;

  @IsNumber()
  @AutoMap()
  timestamp: number;

  @IsString()
  @AutoMap()
  version: string;

  @IsNumber()
  @AutoMap()
  size: number;

  @IsString()
  @AutoMap()
  type: string;
}
