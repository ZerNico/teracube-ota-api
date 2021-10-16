import { Injectable } from '@nestjs/common';
import { CreateUpdateDto } from './dto/create.update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@users/entity/user.entity';
import { Repository } from 'typeorm';
import { UpdateEntity } from './entity/update.entity';

@Injectable()
export class UpdatesService {
  constructor(
    @InjectRepository(UpdateEntity)
    private readonly updateRepo: Repository<UpdateEntity>,
  ) {}

  async create(createUpdateDto: CreateUpdateDto): Promise<UpdateEntity> {
    const update: UpdateEntity = await this.updateRepo.save({
      ...createUpdateDto,
    });
    return update;
  }
}
