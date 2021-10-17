import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseInterceptors, } from '@nestjs/common';
import { UpdatesService } from './updates.service';
import { CreateUpdateDto } from './dto/create-update.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { UpdateEntity } from './entity/update.entity';
import { UpdateDto } from './dto/update-dto';
import { FindOneUpdateParams } from './params/find-one-update.params';
import { UpdateUpdateDto } from './dto/update-update.dto';
import { UpdateUpdateParams } from './params/update-update.params';
import { RemoveUpdateParams } from './params/remove-update.params';

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

  @UseInterceptors(MapInterceptor(UpdateDto, UpdateEntity))
  @Get(':id')
  findOne(@Param() params: FindOneUpdateParams) {
    return this.updatesService.findOne(params.id);
  }

  @HttpCode(204)
  @UseInterceptors(MapInterceptor(UpdateDto, UpdateEntity))
  @Patch(':id')
  update(
    @Param() params: UpdateUpdateParams,
    @Body() updateUpdateDto: UpdateUpdateDto,
  ) {
    return this.updatesService.update(params.id, updateUpdateDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param() params: RemoveUpdateParams) {
    return this.updatesService.remove(params.id);
  }
}
