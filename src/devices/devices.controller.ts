import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post, UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
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
import { UpdateDeviceParams } from '@devices/params/update-device.params';
import { RemoveDeviceParams } from '@devices/params/remove-device.params';
import { FindOneDeviceParams } from '@devices/params/find-one-device.params';
import { BadRequestResponse } from '../swagger/bad-request-response.dto';
import { NotFoundResponse } from '../swagger/not-found-response.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { DeviceEntity } from '@devices/entity/device.entity';

@ApiTags('devices')
@ApiBadRequestResponse({
  description: 'Bad Request',
  type: BadRequestResponse,
})
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(MapInterceptor(DeviceDto, DeviceEntity))
  @Post()
  @ApiCreatedResponse({
    description: 'Device created',
    type: DeviceDto,
  })
  async create(@Body() createDeviceDto: CreateDeviceDto): Promise<DeviceDto> {
    return await this.devicesService.create(createDeviceDto);
  }

  @UseInterceptors(MapInterceptor(DeviceDto, DeviceEntity))
  @Get(':codename')
  @ApiOkResponse({
    description: 'Returned device',
    type: DeviceDto,
  })
  @ApiParam({ name: 'codename', type: 'string' })
  findOne(@Param() params: FindOneDeviceParams) {
    return this.devicesService.findOne(params.codename);
  }

  @UseInterceptors(MapInterceptor(DeviceDto, DeviceEntity, { isArray: true }))
  @Get()
  @ApiOkResponse({
    description: 'Returned devices',
    type: DeviceDto,
    isArray: true,
  })
  async findAll(): Promise<DeviceDto[]> {
    return await this.devicesService.findAll();
  }

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
  update(
    @Param() params: UpdateDeviceParams,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.devicesService.update(params.codename, updateDeviceDto);
  }

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
  remove(@Param() params: RemoveDeviceParams) {
    return this.devicesService.remove(params.codename);
  }
}
