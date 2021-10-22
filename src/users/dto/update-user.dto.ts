import { AutoMap } from '@automapper/classes';
import { UserRole } from '@users/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(1, 32)
  @Matches(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, {
    message: 'Username can only include letters, numbers and . and _',
  })
  @IsOptional()
  @AutoMap()
  @ApiProperty()
  username: string;
  @AutoMap()
  @Length(1, 256)
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email: string;
  @AutoMap()
  @IsEnum(UserRole)
  @IsOptional()
  @ApiProperty()
  role: UserRole;
}
