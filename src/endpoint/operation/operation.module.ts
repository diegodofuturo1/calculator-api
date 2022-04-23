import { Module } from "@nestjs/common";
import { Operation } from "src/entity/operation.entity";
import { OperationController } from "./operation.controller";
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm'
import { OperationService } from "./operation.service";
import { ReadOperationQueryHandler } from "./query/read-operation.query";
import { CreateOperationCommandHandler } from "./command/create-operation.command";

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Operation]),
  ],
  controllers: [
    OperationController,
  ],
  providers: [
    OperationService,
    ReadOperationQueryHandler,
    CreateOperationCommandHandler
  ],
})
export class OperationModule {}
