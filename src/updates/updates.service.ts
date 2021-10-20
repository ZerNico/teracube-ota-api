import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpdateDto } from './dto/create-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEntity } from '@updates/entity/update.entity';
import { UpdateUpdateDto } from './dto/update-update.dto';
import { QueryBuilder } from 'typeorm-express-query-builder';
import { buildsProfile } from '@updates/profile/query-builder.profile';
import { DevicesService } from '@devices/devices.service';
import { Mulberry32, Xmur3 } from '../utils/randUtils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UpdatesService {
  constructor(
    private devicesService: DevicesService,
    @InjectRepository(UpdateEntity)
    private readonly updateRepo: Repository<UpdateEntity>,
  ) {}

  async create(createUpdateDto: CreateUpdateDto): Promise<UpdateEntity> {
    await this.devicesService.findOne(createUpdateDto.codename);
    if (!createUpdateDto.stagedId) createUpdateDto.stagedId = uuidv4();
    return await this.updateRepo.save({
      ...createUpdateDto,
    });
  }

  async findAll(query, identifier): Promise<UpdateEntity[]> {
    const { staging, ...filterQuery } = query;
    const builder = new QueryBuilder(filterQuery, buildsProfile);
    const builtQuery = builder.build();
    const updates: UpdateEntity[] = await this.updateRepo.find(builtQuery);

    if (staging === 'false') return updates;

    const allowedIds: string[] = [];
    const deniedIds: string[] = [];
    // Filter returned builds by seeded random number for staged rollout
    const filteredUpdates = updates.filter((update: UpdateEntity) => {
      if (update.percentage >= 100) return true;
      if (!identifier || update.percentage === 0) return false;
      const randomId = identifier + update.stagedId;
      const random = new Mulberry32(new Xmur3(randomId).getHash());
      const allowed = random.random() * 100 < update.percentage;
      if (allowed) allowedIds.push(update.id);
      else deniedIds.push(update.id);
      return allowed;
    });
    await this.updateRepo
      .createQueryBuilder('update')
      .update(UpdateEntity)
      .whereInIds(allowedIds)
      .set({ allowedCount: () => 'allowed_count + 1' })
      .execute();
    await this.updateRepo
      .createQueryBuilder('update')
      .update(UpdateEntity)
      .whereInIds(deniedIds)
      .set({ deniedCount: () => 'denied_count + 1' })
      .execute();
    return filteredUpdates;
  }

  async findOne(id: string): Promise<UpdateEntity> {
    const update: UpdateEntity = await this.updateRepo.findOne({
      where: { id: id },
    });
    if (!update) throw new NotFoundException();
    return update;
  }

  async update(id: string, updateUpdateDto: UpdateUpdateDto) {
    await this.updateRepo.findOne(id);
    const result = await this.updateRepo.update(id, { ...updateUpdateDto });
    if (result.affected === 0) throw new NotFoundException();
  }

  async remove(id: string) {
    const result = await this.updateRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException();
  }
}
