import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserMapper } from '@users/profile/user.mapper-profile';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, UserMapper],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
