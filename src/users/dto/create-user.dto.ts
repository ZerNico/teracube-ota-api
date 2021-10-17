import { IsEmail, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @AutoMap()
  @ApiProperty()
  username: string;
  @AutoMap()
  @IsString()
  @ApiProperty()
  password: string;
  @AutoMap()
  @IsEmail()
  @ApiProperty()
  email: string;
}
