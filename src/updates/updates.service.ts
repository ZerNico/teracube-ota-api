import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpdateDto } from './dto/create-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEntity } from './entity/update.entity';
import { UpdateUpdateDto } from './dto/update-update.dto';

@Injectable()
export class UpdatesService {
  constructor(
    @InjectRepository(UpdateEntity)
    private readonly updateRepo: Repository<UpdateEntity>,
  ) {}

  async create(createUpdateDto: CreateUpdateDto): Promise<UpdateEntity> {
    return await this.updateRepo.save({
      ...createUpdateDto,
    });
  }

  async findAll(): Promise<UpdateEntity[]> {
    return await this.updateRepo.find();
  }

  async findOne(id: string): Promise<UpdateEntity> {
    const update: UpdateEntity = await this.updateRepo.findOne(id);
    if (!update) throw new NotFoundException();
    return update;
  }

  async update(id: string, updateUpdateDto: UpdateUpdateDto) {
    const result = await this.updateRepo.update(id, { ...updateUpdateDto });
    if (result.affected === 0) throw new NotFoundException();
  }

  async remove(id: string) {
    const result = await this.updateRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException();
  }
}
