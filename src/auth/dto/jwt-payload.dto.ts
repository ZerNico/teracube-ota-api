import { UserRole } from '@users/entity/user.entity';

export interface JwtPayload {
  username: string;
  sub: string;
  role: UserRole;
}
