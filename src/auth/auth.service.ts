import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UserEntity } from '@users/entity/user.entity';
import { LoginTokenPayload, JwtTypes } from '@auth/dto/login-token-payload.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiTokenEntity } from '@auth/entity/api-token.entity';
import { CreateApiTokenDto } from '@auth/dto/create-api-token.dto';
import { AccessTokenDto } from '@auth/dto/access-token.dto';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '@users/dto/user.dto';
import { UpdateEntity } from '@updates/entity/update.entity';
import { ApiTokenPayload } from '@auth/dto/api-token-payload.dto';

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
    const payload: LoginTokenPayload = {
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
    user: UserDto,
  ): Promise<AccessTokenDto> {
    const userFromRepo: UserEntity = await this.usersService.findOneById(
      user.id,
    );
    const payload: ApiTokenPayload = {
      sub: userFromRepo.id,
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

  async findToken(token: string): Promise<ApiTokenEntity> {
    const tokenFromRepo: ApiTokenEntity = await this.tokenRepo.findOne({
      where: { token: token },
    });
    if (!tokenFromRepo) throw new NotFoundException();
    return tokenFromRepo;
  }

  async findAllTokens(user: UserEntity) {
    return await this.tokenRepo.find({ where: { userId: user.id } });
  }

  async removeToken(id: string) {
    const result = await this.tokenRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException();
  }
}
