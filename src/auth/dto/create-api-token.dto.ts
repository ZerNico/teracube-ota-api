import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateApiTokenDto {
  @ApiProperty({ example: 'CLI' })
  @AutoMap()
  @IsString()
  name: string;
}
