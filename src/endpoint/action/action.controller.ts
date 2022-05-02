import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ActionService } from './action.service';
import { Controller, Get, Body, Post, Delete, Param } from '@nestjs/common';
import { CreateActionDto } from 'src/dto/create-action.dto';

@ApiTags('actions')
@Controller('action')
export class ActionController {
  constructor(
    private readonly service: ActionService
  ) {}

  @Get()
  async getAction() {
    return await this.service.getAction();
  }
  @Get(':id')
  async getActionById(@Param('id') id: string) {
    return await this.service.getActionById(id);
  }
  @Get('stage/:id')
  async getActionByStage(@Param('id') id: string) {
    return await this.service.getActionByStage(id);
  }

  @Post()
  async postAction(@Body() body: CreateActionDto) {
    return await this.service.createAction(body.stageId);
  }

  @Delete(':id')
  async deleteAction(@Param('id') id: string) {
    return await this.service.deleteAction(id);
  }
}
