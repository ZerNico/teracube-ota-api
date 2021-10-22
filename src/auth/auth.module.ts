import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiTokenEntity } from '@auth/entity/api-token.entity';
import { ApiTokenMapper } from '@auth/profile/api-token.mapper-profile';
import { InviteEntity } from '@auth/entity/invite.entity';
import { InviteMapper } from '@auth/profile/invite.mapper-profile';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    TypeOrmModule.forFeature([ApiTokenEntity, InviteEntity]),
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ApiTokenMapper,
    InviteMapper,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
