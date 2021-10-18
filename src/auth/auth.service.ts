import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UserEntity } from '@users/entity/user.entity';
import { JwtPayload, JwtTypes } from '@auth/dto/jwt-payload.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiTokenEntity } from '@auth/entity/api-token.entity';
import { CreateApiTokenDto } from '@auth/dto/create-api-token.dto';
import { AccessTokenDto } from '@auth/dto/access-token.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(ApiTokenEntity)
    private readonly tokenRepo: Repository<ApiTokenEntity>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await user.compareHash(pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity): Promise<AccessTokenDto> {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      role: user.role,
      type: JwtTypes.LoginToken,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('jwt.secret'),
        expiresIn: '60m',
      }),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  async createToken(
    createApiTokenDto: CreateApiTokenDto,
    user: JwtPayload,
  ): Promise<AccessTokenDto> {
    const userFromRepo: UserEntity = await this.usersService.findOneById(
      user.sub,
    );
    if (!user) throw new UnauthorizedException();
    const payload: JwtPayload = {
      username: userFromRepo.username,
      sub: userFromRepo.id,
      role: userFromRepo.role,
      type: JwtTypes.ApiToken,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.secret'),
      expiresIn: '10y',
    });

    await this.tokenRepo.save({
      userId: userFromRepo.id,
      token: accessToken,
      name: createApiTokenDto.name,
    });

    return {
      access_token: accessToken,
    };
  }

  async findAllTokens(user: JwtPayload) {
    return await this.tokenRepo.find();
  }
}
