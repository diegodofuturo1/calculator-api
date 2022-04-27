import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StageService } from "./stage.service";
import { StageController } from "./stage.controller";
import { CreateStageCommandHandler } from "./command/create-stage.command";
import { DeleteStageCommandHandler } from "./command/delete-stage.command";
import { UpdateStageCommandHandler } from "./command/update-stage.command";
import { ReadStageByIdQueryHandler } from "./query/read-stage-by-id.query";
import { ReadStageQueryHandler } from "./query/read-stage.query";
import Entity from "src/entity";

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
    ReadStageQueryHandler
  ],
  exports: [
    StageService
  ]
})
export class StageModule {}
