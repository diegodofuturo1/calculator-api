import { Controller, Get, Body, Post } from '@nestjs/common';
import { Operation } from 'src/entity/operation.entity';
import { OperationService } from './operation.service';

@Controller('operation')
export class OperationController {
  constructor(private readonly service: OperationService) {}

  @Get()
  getOperation() {
    return this.service.getOperation();
  }
  @Post()
  postOperation(@Body() body: Operation) {
    return this.service.createOperation(body);
  }
}
