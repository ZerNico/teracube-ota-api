import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateEntity } from './entity/update.entity';
import { UpdatesService } from './updates.service';
import { UpdatesController } from './updates.controller';
import { UpdateMapper } from './profile/update.mapper-profile';

@Module({
  imports: [TypeOrmModule.forFeature([UpdateEntity])],
  providers: [UpdatesService, UpdateMapper],
  exports: [UpdatesService],
  controllers: [UpdatesController],
})
export class UpdatesModule {}
