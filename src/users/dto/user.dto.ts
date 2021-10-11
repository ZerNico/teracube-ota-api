import { AutoMap } from '@automapper/classes';
import { UserRole } from '@users/entity/user.entity';

export class UserDto {
  @AutoMap()
  username: string;
  @AutoMap()
  email: string;
  @AutoMap()
  role: UserRole;
}
