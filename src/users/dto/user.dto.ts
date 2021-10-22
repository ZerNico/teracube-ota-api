import { AutoMap } from '@automapper/classes';
import { UserRole } from '@users/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap()
  @ApiProperty()
  username: string;

  @AutoMap()
  @ApiProperty()
  email: string;

  @AutoMap()
  @ApiProperty()
  role: UserRole;

  @ApiProperty()
  @AutoMap()
  createdAt: Date;

  @ApiProperty()
  @AutoMap()
  updatedAt: Date;
}
