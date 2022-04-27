import { Injectable } from '@nestjs/common';
import { Action } from 'src/entity/action.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ReadActionQuery } from './query/read-action.query';
import { CreateActionCommand } from './command/create-action.command';
import { DeleteActionCommand } from './command/delete-action.command';
import { ReadActionByStageQuery } from './query/read-action-by-stage.query';
import { ReadActionByIdQuery } from './query/read-action-by-id.query';

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
    async getActionByStage(stageId: string): Promise<Action[]> {
      return await this.queryBus.execute(new ReadActionByStageQuery(stageId));
    }
    async createAction(action: Action): Promise<Action> {
        return await this.commandBus.execute(new CreateActionCommand(action))
    }
    async deleteAction(actionId: string): Promise<Action> {
        const action = await this.queryBus.execute(new ReadActionByIdQuery(actionId))
        return await this.commandBus.execute(new DeleteActionCommand(action))
    }
}
