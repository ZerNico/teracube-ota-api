import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Req, Param, Delete,
} from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UserDto } from '@users/dto/user.dto';
import { InjectMapper, MapInterceptor } from '@automapper/nestjs';
import { UserEntity, UserRole } from '@users/entity/user.entity';
import { Mapper } from '@automapper/types';
import { Roles } from '@auth/decorator/roles.decorator';
import { RolesGuard } from '@auth/guard/role.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { BadRequestResponse } from '../swagger/bad-request-response.dto';
import { UpdateDto } from '@updates/dto/update.dto';
import { UpdateEntity } from '@updates/entity/update.entity';
import { CreateApiTokenDto } from '@auth/dto/create-api-token.dto';
import { AccessTokenDto } from '@auth/dto/access-token.dto';
import { DeviceDto } from '@devices/dto/device.dto';
import { ApiTokenDto } from '@auth/dto/api-token.dto';
import { ApiTokenEntity } from '@auth/entity/api-token.entity';
import { RemoveApiTokenParams } from '@auth/params/remove-api-token.params';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<AccessTokenDto> {
    return this.authService.login(req.user);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(MapInterceptor(UserDto, UserEntity))
  @Post('register')
  @ApiCreatedResponse({
    description: 'The user has been registered.',
    type: UserDto,
  })
  @ApiBadRequestResponse({
    description: 'User already exists',
    type: BadRequestResponse,
  })
  async register(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.authService.register(createUserDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('tokens')
  async createToken(
    @Body() createApiTokenDto: CreateApiTokenDto,
    @Req() req,
  ): Promise<AccessTokenDto> {
    return await this.authService.createToken(createApiTokenDto, req.user);
  }

  @UseInterceptors(
    MapInterceptor(ApiTokenDto, ApiTokenEntity, { isArray: true }),
  )
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('tokens')
  async findAll(@Request() req) {
    return await this.authService.findAllTokens(req.user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('tokens/:id')
  async remove(@Param() params: RemoveApiTokenParams) {
    return await this.authService.removeToken(params.id);
  }
}
