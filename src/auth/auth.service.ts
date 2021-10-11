import { Injectable } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@users/dto/create.user.dto';
import { UserEntity } from '@users/entity/user.entity';
import { JwtPayload } from '@auth/dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await user.compareHash(pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }
}
