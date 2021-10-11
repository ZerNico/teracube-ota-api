import { AutoMap } from '@automapper/classes';
import { UserRole } from '@users/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @AutoMap()
  @ApiProperty()
  username: string;
  @AutoMap()
  @ApiProperty()
  email: string;
  @AutoMap()
  @ApiProperty()
  role: UserRole;
}
