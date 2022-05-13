import { ApiTags } from '@nestjs/swagger';
import { StageService } from './stage.service';
import { Stage } from 'src/entity/stage.entity';
import { Controller, Get, Body, Post, Put, Delete, Param } from '@nestjs/common';

@ApiTags('stages')
@Controller('stage')
export class StageController {
  constructor(private readonly service: StageService) {}

  @Get()
  async getStage() {
    return await this.service.getStage();
  }

  @Get(':id')
  async getStageById(@Param('id') id: string) {
    return await this.service.getStageById(id);
  }

  @Get('level/:level')
  async getStageByLevel(@Param('level') level: number) {
    return await this.service.getStageByLevel(level);
  }

  @Post()
  async postStage(@Body() body: Stage) {
    return await this.service.createStage(body);
  }

  @Put()
  async putStage(@Body() body: Stage) {
    return await this.service.updateStage(body);
  }

  @Delete(':id')
  async deleteStage(@Param('id') id: string) {
    return await this.deleteStage(id)
  }
}
