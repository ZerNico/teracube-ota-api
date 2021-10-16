import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpdateDto } from './dto/create.update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEntity } from './entity/update.entity';

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

  async findOne(id: string) {
    const update: UpdateEntity = await this.updateRepo.findOne(id);
    if (!update) throw new NotFoundException();
    return update;
  }
}
