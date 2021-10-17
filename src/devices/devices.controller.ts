import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { DevicesService } from '@devices/devices.service';
import { DeviceDto } from '@devices/dto/device.dto';
import { CreateDeviceDto } from '@devices/dto/create-device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiCreatedResponse({
    description: 'Device created',
    type: DeviceDto,
  })
  async create(@Body() createDeviceDto: CreateDeviceDto): Promise<DeviceDto> {
    return await this.devicesService.create(createDeviceDto);
  }
}
