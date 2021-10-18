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
  Query, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdatesService } from './updates.service';
import { CreateUpdateDto } from './dto/create-update.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { UpdateEntity } from './entity/update.entity';
import { UpdateDto } from './dto/update.dto';
import { FindOneUpdateParams } from './params/find-one-update.params';
import { UpdateUpdateDto } from './dto/update-update.dto';
import { UpdateUpdateParams } from './params/update-update.params';
import { RemoveUpdateParams } from './params/remove-update.params';
import {
  ApiBadRequestResponse, ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestResponse } from '../swagger/bad-request-response.dto';
import { NotFoundResponse } from '../swagger/not-found-response.dto';
import { Roles } from '@auth/decorator/roles.decorator';
import { UserRole } from '@users/entity/user.entity';
import { JwtAuthGuard } from '@auth/guard/jwt-auth.guard';
import { RolesGuard } from '@auth/guard/role.guard';

@ApiTags('updates')
@ApiBadRequestResponse({
  description: 'Bad Request',
  type: BadRequestResponse,
})
@Controller('updates')
export class UpdatesController {
  constructor(private readonly updatesService: UpdatesService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(MapInterceptor(UpdateDto, UpdateEntity))
  @Post()
  @ApiCreatedResponse({
    description: 'Update created',
    type: UpdateDto,
  })
  @ApiBearerAuth()
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
  @ApiQuery({
    name: 'timestamp__gt',
    description: 'Updates with timestamp greater than',
    example: 1613585773,
    required: false,
  })
  @ApiQuery({
    name: 'device',
    description: 'Updates with specific device',
    example: 'device',
    required: false,
  })
  async findAll(@Query() query): Promise<UpdateDto[]> {
    return await this.updatesService.findAll(query);
  }

  @UseInterceptors(MapInterceptor(UpdateDto, UpdateEntity))
  @Get(':id')
  @ApiOkResponse({
    description: 'Returned update',
    type: UpdateDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: NotFoundResponse,
  })
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param() params: FindOneUpdateParams) {
    return this.updatesService.findOne(params.id);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  @ApiNoContentResponse({
    description: 'Update patched',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: NotFoundResponse,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBearerAuth()
  update(
    @Param() params: UpdateUpdateParams,
    @Body() updateUpdateDto: UpdateUpdateDto,
  ) {
    return this.updatesService.update(params.id, updateUpdateDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNotFoundResponse({
    description: 'Not found',
    type: NotFoundResponse,
  })
  @ApiNoContentResponse({
    description: 'Update deleted',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBearerAuth()
  remove(@Param() params: RemoveUpdateParams) {
    return this.updatesService.remove(params.id);
  }
}
