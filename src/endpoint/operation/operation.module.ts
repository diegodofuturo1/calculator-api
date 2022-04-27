import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm'
import { OperationService } from "./operation.service";
import { OperationController } from "./operation.controller";
import { ReadOperationQueryHandler } from "./query/read-operation.query";
import { CreateOperationCommandHandler } from "./command/create-operation.command";
import { DeleteOperationCommandHandler } from "./command/delete-operation.command";
import { RelateActionOperationCommandHandler } from "./command/relate-action-operation.command";
import { RelateStageOperationCommandHandler } from "./command/relate-stage-operation.command";
import { ReadOperationByActionQueryHandler } from "./query/read-operation-by-action.query";
import { ReadOperationByStageQueryHandler } from "./query/read-operation-by-stage.query";
import { ReadOperationByIdQueryHandler } from "./query/read-operation-by-id.query";
import { StageModule } from "../stage/stage.module";
import { ActionModule } from "../action/action.module";
import Entity from "src/entity";

@Module({
  imports: [
    CqrsModule,
    StageModule,
    ActionModule,
    TypeOrmModule.forFeature(Entity),
  ],
  controllers: [
    OperationController,
  ],
  providers: [
    OperationService,
    CreateOperationCommandHandler,
    DeleteOperationCommandHandler,
    RelateActionOperationCommandHandler,
    RelateStageOperationCommandHandler,
    ReadOperationByActionQueryHandler,
    ReadOperationByStageQueryHandler,
    ReadOperationByIdQueryHandler,
    ReadOperationQueryHandler,
  ],
})
export class OperationModule {}
