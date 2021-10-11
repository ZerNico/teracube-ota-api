import { IsEmail, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateUserDto {
  @IsString()
  @AutoMap()
  username: string;
  @AutoMap()
  @IsString()
  password: string;
  @AutoMap()
  @IsEmail()
  email: string;
}
