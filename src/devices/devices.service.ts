import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateEntity } from '@updates/entity/update.entity';
import { Repository } from 'typeorm';
import { DeviceEntity } from '@devices/entity/device.entity';
import { CreateDeviceDto } from '@devices/dto/create-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepo: Repository<DeviceEntity>,
  ) {}
  async create(createDeviceDto: CreateDeviceDto) {
    try {
      await this.findOne(createDeviceDto.codename);
    } catch (err) {
      return await this.deviceRepo.save({
        ...createDeviceDto,
      });
    }
    throw new BadRequestException('Device already exists');
  }

  async findOne(id: string): Promise<DeviceEntity> {
    const device: DeviceEntity = await this.deviceRepo.findOne(id);
    if (!device) throw new NotFoundException('Device not found');
    return device;
  }
}
