import { Controller, Get, Body, Post, Delete, Param } from '@nestjs/common';
import { Action } from 'src/entity/action.entity';
import { ActionService } from './action.service';

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
  async postAction(@Body() body: Action) {
    return await this.service.createAction(body);
  }

  @Delete(':id')
  async deleteAction(@Param('id') id: string) {
    const deleteResult = await this.service.deleteAction(id);
    return deleteResult
  }
}
