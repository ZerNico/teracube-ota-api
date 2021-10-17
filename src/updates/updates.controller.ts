import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UpdatesService } from './updates.service';
import { CreateUpdateDto } from './dto/create-update.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { UpdateEntity } from './entity/update.entity';
import { UpdateDto } from './dto/update-dto';
import { FindOneUpdateParams } from './params/find-one-update.params';
import { UpdateUpdateDto } from './dto/update-update.dto';
import { UpdateUpdateParams } from './params/update-update.params';
import { RemoveUpdateParams } from './params/remove-update.params';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestResponse } from '../swagger/bad-request-response.dto';
import { NotFoundResponse } from '../swagger/not-found-response.dto';

@ApiTags('updates')
@ApiBadRequestResponse({
  description: 'Bad Request',
  type: BadRequestResponse,
})
@Controller('updates')
export class UpdatesController {
  constructor(private readonly updatesService: UpdatesService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(MapInterceptor(UpdateDto, UpdateEntity))
  @Post()
  @ApiCreatedResponse({
    description: 'Update created',
    type: UpdateDto,
  })
  async create(@Body() createUpdateDto: CreateUpdateDto): Promise<UpdateDto> {
    return await this.updatesService.create(createUpdateDto);
  }

  @UseInterceptors(MapInterceptor(UpdateDto, UpdateEntity, { isArray: true }))
  @Get()
  @ApiOkResponse({
    description: 'Returned updates',
    type: UpdateDto,
    isArray: true,
  })
  async findAll(): Promise<UpdateDto[]> {
    return await this.updatesService.findAll();
  }

  @UseInterceptors(MapInterceptor(UpdateDto, UpdateEntity))
  @Get(':id')
  @ApiOkResponse({
    description: 'Returned update',
    type: UpdateDto,
  })
  @ApiNotFoundResponse({
    description: 'Bad Request',
    type: NotFoundResponse,
  })
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param() params: FindOneUpdateParams) {
    return this.updatesService.findOne(params.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  @ApiNoContentResponse({
    description: 'Update patched',
  })
  @ApiNotFoundResponse({
    description: 'Bad Request',
    type: NotFoundResponse,
  })
  @ApiParam({ name: 'id', type: 'UUID' })
  update(
    @Param() params: UpdateUpdateParams,
    @Body() updateUpdateDto: UpdateUpdateDto,
  ) {
    return this.updatesService.update(params.id, updateUpdateDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNotFoundResponse({
    description: 'Bad Request',
    type: NotFoundResponse,
  })
  @ApiNoContentResponse({
    description: 'Update deleted',
  })
  @ApiParam({ name: 'id', type: 'UUID' })
  remove(@Param() params: RemoveUpdateParams) {
    return this.updatesService.remove(params.id);
  }
}
