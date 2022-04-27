import { Controller, Get, Body, Post, Delete, Param } from '@nestjs/common';
import { Operation } from 'src/entity/operation.entity';
import { ActionService } from '../action/action.service';
import { StageService } from '../stage/stage.service';
import { OperationService } from './operation.service';

@Controller('operation')
export class OperationController {
  constructor(
    private readonly service: OperationService,
    private readonly actionService: ActionService,
    private readonly stageService: StageService,
  ) {}

  @Get()
  async getOperation() {
    return this.service.getOperation();
  }
  
  @Get(':id')
  async getOperationById(@Param('id') id: string) {
    return await this.service.getOperationById(id);
  }
  
  @Get('action/:id')
  async getOperationByAction(@Param('id') id: string) {
    return await this.service.getOperationByAction(id);
  }
  
  @Get('stage/:id')
  async getOperationByStage(@Param('id') id: string) {
    return await this.service.getOperationByStage(id);
  }
  
  @Post()
  async postOperation(@Body() body: Operation) {
    return this.service.createOperation(body);
  }
  
  @Delete(':id')
  async deleteOperation(@Param('id') id: string) {
    return this.service.deleteOperation(id);
  }

  @Post('action')
  async relateActionOperation(@Body() body: { actionId: string, operationId: string }) {
    const { actionId, operationId } = body
    const action = await this.actionService.getActionById(actionId)
    return this.service.relateActionOperation(action, operationId)
  }

  @Post('stage')
  async relateStageOperation(@Body() body: { stageId: string, operationId: string }) {
    const { stageId, operationId } = body
    const stage = await this.stageService.getStageById(stageId)
    return this.service.relateStageOperation(stage, operationId)
  }
}
