import { Injectable } from '@nestjs/common';
import { Operation } from 'src/entity/operation.entity';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'
import { ReadOperationQuery } from './query/read-operation.query';
import { CreateOperationCommand } from './command/create-operation.command';

@Injectable()
export class OperationService {
    constructor(
      private readonly commandBus: CommandBus,
      private readonly queryBus: QueryBus,
      private readonly eventBus: EventBus
    ) { }

    async getOperation(): Promise<Operation[]> {
      return await this.queryBus.execute(new ReadOperationQuery({}));
    }
    async createOperation(operation: Operation): Promise<Operation> {
        return await this.commandBus.execute(new CreateOperationCommand(operation))
    }
}
