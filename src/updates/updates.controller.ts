import { Body, Controller, Get, Param, Post, UseInterceptors, } from '@nestjs/common';
import { UpdatesService } from './updates.service';
import { CreateUpdateDto } from './dto/create.update.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { UpdateEntity } from './entity/update.entity';
import { UpdateDto } from './dto/update.dto';
import { FindOneUpdateParams } from './params/fine-one.update.params';

@Controller('updates')
export class UpdatesController {
  constructor(private readonly updatesService: UpdatesService) {}

  @UseInterceptors(MapInterceptor(UpdateDto, UpdateEntity))
  @Post()
  async create(@Body() createUpdateDto: CreateUpdateDto): Promise<UpdateDto> {
    return await this.updatesService.create(createUpdateDto);
  }

  @UseInterceptors(MapInterceptor(UpdateDto, UpdateEntity, { isArray: true }))
  @Get()
  async findAll(): Promise<UpdateDto[]> {
    return await this.updatesService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneUpdateParams) {
    return this.updatesService.findOne(params.id);
  }

  /*
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
