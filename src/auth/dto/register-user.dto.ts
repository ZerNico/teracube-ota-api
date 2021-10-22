import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @IsString()
  @Length(1, 32)
  @Matches(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, {
    message: 'Username can only include letters, numbers and . and _',
  })
  @AutoMap()
  @ApiProperty()
  username: string;
  @AutoMap()
  @Length(5, 256)
  @IsString()
  @ApiProperty()
  password: string;
  @AutoMap()
  @Length(1, 256)
  @IsEmail()
  @ApiProperty()
  email: string;
  @AutoMap()
  @Length(1, 256)
  @IsUUID()
  @IsOptional()
  @ApiProperty()
  invite: string;
}
