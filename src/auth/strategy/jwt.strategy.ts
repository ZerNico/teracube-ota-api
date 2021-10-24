import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginTokenPayload, JwtTypes } from '@auth/dto/login-token-payload.dto';
import { AuthService } from '@auth/auth.service';
import { UsersService } from '@users/users.service';
import { UserEntity } from '@users/entity/user.entity';
import { ApiTokenEntity } from '@auth/entity/api-token.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('app.jwt.secret'),
      passReqToCallback: true,
    });
  }

  async validate(req, payload: LoginTokenPayload) {
    if (payload.type === JwtTypes.ApiToken) {
      const jwt = req.headers.authorization.replace('Bearer ', '');
      try {
        const token: ApiTokenEntity = await this.authService.findToken(jwt);
        const user: UserEntity = await this.userService.findOneById(
          token.userId,
        );
        return {
          id: user.id,
          username: user.username,
          role: user.role,
          type: payload.type,
        };
      } catch (err) {
        throw new UnauthorizedException();
      }
    }
    return {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
      type: payload.type,
    };
  }
}
