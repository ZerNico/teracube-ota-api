import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceEntity } from '@devices/entity/device.entity';
import { CreateDeviceDto } from '@devices/dto/create-device.dto';
import { UpdateDeviceDto } from '@devices/dto/update-device.dto';

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

  async findOne(codename: string): Promise<DeviceEntity> {
    const device: DeviceEntity = await this.deviceRepo.findOne(codename);
    if (!device) throw new NotFoundException('Device not found');
    return device;
  }

  async findAll(): Promise<DeviceEntity[]> {
    return await this.deviceRepo.find();
  }

  async update(codename: string, updateDeviceDto: UpdateDeviceDto) {
    await this.findOne(codename);
    const result = await this.deviceRepo.update(codename, {
      ...updateDeviceDto,
    });
    if (result.affected === 0) throw new NotFoundException();
  }

  async remove(codename: string) {
    const result = await this.deviceRepo.delete(codename);
    if (result.affected === 0) throw new NotFoundException();
  }
}
