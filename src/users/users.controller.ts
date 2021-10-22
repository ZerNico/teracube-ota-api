import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestResponse } from '../swagger/bad-request-response.dto';
import { Roles } from '@auth/decorator/roles.decorator';
import { UserEntity, UserRole } from '@users/entity/user.entity';
import { JwtAuthGuard } from '@auth/guard/jwt-auth.guard';
import { RolesGuard } from '@auth/guard/role.guard';
import { MapInterceptor } from '@automapper/nestjs';
import { NotFoundResponse } from '../swagger/not-found-response.dto';
import { UsersService } from '@users/users.service';
import { UserIdParams } from '@users/params/user-id.params';
import { UserDto } from '@users/dto/user.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';

@ApiTags('users')
@ApiBadRequestResponse({
  description: 'Bad Request',
  type: BadRequestResponse,
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(MapInterceptor(UserDto, UserEntity))
  @Get(':id')
  @ApiOkResponse({
    description: 'Returned user',
    type: UserDto,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBearerAuth()
  findOne(@Param() params: UserIdParams): Promise<UserEntity> {
    return this.usersService.findOneById(params.id);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(MapInterceptor(UserDto, UserEntity, { isArray: true }))
  @Get()
  @ApiOkResponse({
    description: 'Returned users',
    type: UserDto,
    isArray: true,
  })
  @ApiBearerAuth()
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  @ApiNoContentResponse({
    description: 'User patched',
  })
  @ApiNotFoundResponse({
    description: 'Bad Request',
    type: NotFoundResponse,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBearerAuth()
  update(@Param() params: UserIdParams, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(params.id, updateUserDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNotFoundResponse({
    description: 'Bad Request',
    type: NotFoundResponse,
  })
  @ApiNoContentResponse({
    description: 'User deleted',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBearerAuth()
  remove(@Param() params: UserIdParams) {
    return this.usersService.remove(params.id);
  }
}
