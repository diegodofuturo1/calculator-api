import Entity from "src/entity";
import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StageService } from "./stage.service";
import { StageController } from "./stage.controller";
import { ReadStageQueryHandler } from "./query/read-stage.query";
import { CreateStageCommandHandler } from "./command/create-stage.command";
import { DeleteStageCommandHandler } from "./command/delete-stage.command";
import { UpdateStageCommandHandler } from "./command/update-stage.command";
import { ReadStageByIdQueryHandler } from "./query/read-stage-by-id.query";
import { ReadStageByLevelQueryHandler } from "./query/read-stage-by-level.query";
import { ReadNewStageQueryHandler } from "./query/read-new-stage.query";

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature(Entity),
  ],
  controllers: [
    StageController,
  ],
  providers: [
    StageService,
    CreateStageCommandHandler,
    DeleteStageCommandHandler,
    UpdateStageCommandHandler,
    ReadStageByIdQueryHandler,
    ReadStageQueryHandler,
    ReadNewStageQueryHandler,
    ReadStageByLevelQueryHandler
  ],
  exports: [
    StageService
  ]
})
export class StageModule {}
