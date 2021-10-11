import { AutoMap } from '@automapper/classes';

export class UserDto {
  @AutoMap()
  username: string;
  @AutoMap()
  email: string;
}
