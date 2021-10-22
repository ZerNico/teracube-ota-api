import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
import { DevicesService } from '@devices/devices.service';
import { DeviceDto } from '@devices/dto/device.dto';
import { CreateDeviceDto } from '@devices/dto/create-device.dto';
import { UpdateDeviceDto } from '@devices/dto/update-device.dto';
import { BadRequestResponse } from '../swagger/bad-request-response.dto';
import { NotFoundResponse } from '../swagger/not-found-response.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { DeviceEntity } from '@devices/entity/device.entity';
import { Roles } from '@auth/decorator/roles.decorator';
import { UserRole } from '@users/entity/user.entity';
import { JwtAuthGuard } from '@auth/guard/jwt-auth.guard';
import { RolesGuard } from '@auth/guard/role.guard';
import { DeviceCodenameParams } from '@devices/params/device-codename.params';

@ApiTags('devices')
@ApiBadRequestResponse({
  description: 'Bad Request',
  type: BadRequestResponse,
})
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(MapInterceptor(DeviceDto, DeviceEntity))
  @Post()
  @ApiCreatedResponse({
    description: 'Device created',
    type: DeviceDto,
  })
  @ApiBearerAuth()
  async create(
    @Body() createDeviceDto: CreateDeviceDto,
  ): Promise<DeviceEntity> {
    return await this.devicesService.create(createDeviceDto);
  }

  @UseInterceptors(MapInterceptor(DeviceDto, DeviceEntity))
  @Get(':codename')
  @ApiOkResponse({
    description: 'Returned device',
    type: DeviceDto,
  })
  @ApiParam({ name: 'codename', type: 'string' })
  findOne(@Param() params: DeviceCodenameParams): Promise<DeviceEntity> {
    return this.devicesService.findOne(params.codename);
  }

  @UseInterceptors(MapInterceptor(DeviceDto, DeviceEntity, { isArray: true }))
  @Get()
  @ApiOkResponse({
    description: 'Returned devices',
    type: DeviceDto,
    isArray: true,
  })
  async findAll(): Promise<DeviceEntity[]> {
    return await this.devicesService.findAll();
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':codename')
  @ApiNoContentResponse({
    description: 'Device patched',
  })
  @ApiNotFoundResponse({
    description: 'Bad Request',
    type: NotFoundResponse,
  })
  @ApiParam({ name: 'codename', type: 'string' })
  @ApiBearerAuth()
  update(
    @Param() params: DeviceCodenameParams,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.devicesService.update(params.codename, updateDeviceDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':codename')
  @ApiNotFoundResponse({
    description: 'Bad Request',
    type: NotFoundResponse,
  })
  @ApiNoContentResponse({
    description: 'Device deleted',
  })
  @ApiParam({ name: 'codename', type: 'string' })
  @ApiBearerAuth()
  remove(@Param() params: DeviceCodenameParams) {
    return this.devicesService.remove(params.codename);
  }
}
