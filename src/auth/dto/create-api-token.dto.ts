import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateApiTokenDto {
  @ApiProperty({ example: 'CLI' })
  @Length(1, 256)
  @AutoMap()
  @IsString()
  name: string;
}
