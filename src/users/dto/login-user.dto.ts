import { IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsString()
  @AutoMap()
  @ApiProperty()
  username: string;
  @AutoMap()
  @IsString()
  @ApiProperty()
  password: string;
}
