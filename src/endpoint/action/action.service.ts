import { Injectable } from '@nestjs/common';
import { Action } from 'src/entity/action.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ReadActionQuery } from './query/read-action.query';
import { CreateActionCommand } from './command/create-action.command';
import { DeleteActionCommand } from './command/delete-action.command';
import { ReadActionByIdQuery } from './query/read-action-by-id.query';
import { ReadStageByIdQuery } from '../stage/query/read-stage-by-id.query';
import { ReadOperationByStageQuery } from '../operation/query/read-operation-by-stage.query';
import { Operation } from 'src/entity/operation.entity';
import { Stage } from 'src/entity/stage.entity';
import { ActionDto } from 'src/dto/action.dto';
import { ReadActionOperationByStageQuery } from './query/read-action-operations.query';

@Injectable()
export class ActionService {
    constructor(
      private readonly commandBus: CommandBus,
      private readonly queryBus: QueryBus
    ) { }

    async getAction(): Promise<Action[]> {
      return await this.queryBus.execute(new ReadActionQuery({}));
    }
    async getActionById(actionId: string): Promise<Action> {
      return await this.queryBus.execute(new ReadActionByIdQuery(actionId));
    }
    async getActionByStage(stageId: string): Promise<ActionDto[]> {
      return await this.queryBus.execute(new ReadActionOperationByStageQuery(stageId));
    }
    
    async createAction(stageId: string): Promise<Action[]> {
        const stage: Stage = await this.queryBus.execute(new ReadStageByIdQuery(stageId))
        const operations: Operation[] = await this.queryBus.execute(new ReadOperationByStageQuery(stage.id))
        return await this.commandBus.execute(new CreateActionCommand(stage, operations))
    }
    async deleteAction(actionId: string): Promise<Action> {
        const action = await this.queryBus.execute(new ReadActionByIdQuery(actionId))
        return await this.commandBus.execute(new DeleteActionCommand(action))
    }
}
