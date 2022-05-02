import { ApiTags } from '@nestjs/swagger';
import { OperationService } from './operation.service';
import { CreateOperationDto } from 'src/dto/create-operation.dto';
import { Controller, Get, Body, Post, Delete, Param } from '@nestjs/common';

@ApiTags('operations')
@Controller('operation')
export class OperationController {
  constructor(
    private readonly service: OperationService
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
  async postOperation(@Body() body: CreateOperationDto) {
    return this.service.createOperation(body);
  }
  
  @Delete(':id')
  async deleteOperation(@Param('id') id: string) {
    return this.service.deleteOperation(id);
  }
}
