import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UpdatesService } from './updates.service';
import { CreateUpdateDto } from './dto/create.update.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { UpdateEntity } from './entity/update.entity';
import { UpdateDto } from './dto/update.dto';

@Controller('updates')
export class UpdatesController {
  constructor(private readonly updatesService: UpdatesService) {}

  @UseInterceptors(MapInterceptor(UpdateDto, UpdateEntity))
  @Post()
  create(@Body() createUpdateDto: CreateUpdateDto) {
    return this.updatesService.create(createUpdateDto);
  }

  /*
  @Get()
  findAll() {
    return this.updatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.updatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUpdateDto: UpdateUpdateDto) {
    return this.updatesService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.updatesService.remove(+id);
  }
  */
}
