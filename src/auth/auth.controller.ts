import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CreateUserDto } from '@users/dto/create.user.dto';
import { UserDto } from '@users/dto/user.dto';
import { InjectMapper, MapInterceptor } from '@automapper/nestjs';
import { UserEntity, UserRole } from '@users/entity/user.entity';
import { Mapper } from '@automapper/types';
import { Roles } from '@auth/decorator/roles.decorator';
import { RolesGuard } from '@auth/guard/role.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseInterceptors(MapInterceptor(UserDto, UserEntity))
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
