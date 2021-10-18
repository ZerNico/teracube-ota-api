import { UserRole } from '@users/entity/user.entity';

export enum JwtTypes {
  ApiToken = 'apiToken',
  LoginToken = 'loginToken',
}

export interface JwtPayload {
  username: string;
  sub: string;
  type: JwtTypes;
  role: UserRole;
}
