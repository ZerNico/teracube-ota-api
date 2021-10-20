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
  Req,
  Param,
  Delete,
} from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UserDto } from '@users/dto/user.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { UserEntity, UserRole } from '@users/entity/user.entity';
import { Roles } from '@auth/decorator/roles.decorator';
import { RolesGuard } from '@auth/guard/role.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestResponse } from '../swagger/bad-request-response.dto';
import { CreateApiTokenDto } from '@auth/dto/create-api-token.dto';
import { AccessTokenDto } from '@auth/dto/access-token.dto';
import { ApiTokenDto } from '@auth/dto/api-token.dto';
import { ApiTokenEntity } from '@auth/entity/api-token.entity';
import { RemoveApiTokenParams } from '@auth/params/remove-api-token.params';
import { LoginUserDto } from '@users/dto/login-user.dto';
import { UnauthorizedResponse } from '../swagger/unauthorized-response.dto';
import { NotFoundResponse } from '../swagger/not-found-response.dto';
import { InviteDto } from '@auth/dto/invite.dto';
import { InviteEntity } from '@auth/entity/invite.entity';
import { RemoveInviteParams } from '@auth/params/remove-invite.params';

@ApiTags('auth')
@Controller('auth')
@ApiBadRequestResponse({
  description: 'Bad Request',
  type: BadRequestResponse,
})
@ApiBadRequestResponse({
  description: 'Unauthorized',
  type: UnauthorizedResponse,
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({
    description: 'Returns access token',
    type: AccessTokenDto,
  })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Request() req,
  ): Promise<AccessTokenDto> {
    return this.authService.login(req.user);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(MapInterceptor(UserDto, UserEntity))
  @Post('register')
  @ApiCreatedResponse({
    description: 'User has been registered',
    type: UserDto,
  })
  async register(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.authService.register(createUserDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('tokens')
  @ApiOkResponse({
    description: 'Returns access token',
    type: AccessTokenDto,
  })
  @ApiBearerAuth()
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
  @ApiOkResponse({
    description: 'Returned api tokens',
    type: ApiTokenDto,
    isArray: true,
  })
  @ApiBearerAuth()
  async findAllTokens(@Request() req): Promise<ApiTokenDto[]> {
    return await this.authService.findAllTokens(req.user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('tokens/:id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNoContentResponse({
    description: 'Api token deleted',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: NotFoundResponse,
  })
  @ApiBearerAuth()
  async removeToken(@Param() params: RemoveApiTokenParams) {
    return await this.authService.removeToken(params.id);
  }

  @UseInterceptors(MapInterceptor(InviteDto, InviteEntity))
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('invites')
  @ApiOkResponse({
    description: 'Returns invite',
    type: InviteDto,
  })
  @ApiBearerAuth()
  async createInvite(): Promise<InviteDto> {
    return await this.authService.createInvite();
  }

  @UseInterceptors(MapInterceptor(InviteDto, InviteEntity, { isArray: true }))
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('invites')
  @ApiOkResponse({
    description: 'Returns Invites',
    type: InviteDto,
    isArray: true,
  })
  @ApiBearerAuth()
  async findAllInvites(): Promise<InviteDto[]> {
    return await this.authService.findAllInvites();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('invites/:id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNoContentResponse({
    description: 'Invite deleted',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: NotFoundResponse,
  })
  @ApiBearerAuth()
  async removeInvite(@Param() params: RemoveInviteParams) {
    return await this.authService.removeToken(params.id);
  }
}
