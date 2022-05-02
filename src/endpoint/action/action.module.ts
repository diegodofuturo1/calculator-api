import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ActionService } from "./action.service";
import { ActionController } from "./action.controller";
import { CreateActionCommandHandler } from "./command/create-action.command";
import { DeleteActionCommandHandler } from "./command/delete-action.command";
import { ReadActionByIdQueryHandler } from "./query/read-action-by-id.query";
import { ReadActionByStageQueryHandler } from "./query/read-action-by-stage.query";
import { ReadActionQueryHandler } from "./query/read-action.query";
import Entity from "src/entity";
import { UpdateActionCommandHandler } from "./command/update-action.command";

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature(Entity),
  ],
  controllers: [
    ActionController,
  ],
  providers: [
    ActionService,
    CreateActionCommandHandler,
    DeleteActionCommandHandler,
    ReadActionByIdQueryHandler,
    ReadActionByStageQueryHandler,
    ReadActionQueryHandler,
    UpdateActionCommandHandler,
  ],
  exports: [
    ActionService,
  ]
})
export class ActionModule {}
