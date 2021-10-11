import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEntity } from '@users/entity/user.entity';

const matchRoles = (roles, userRoles) => {
  return roles.some((role) => role === userRoles);
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest() as any;
    const user: UserEntity = req.user;
    return matchRoles(roles, user.role);
  }
}
