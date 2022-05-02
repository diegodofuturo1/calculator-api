import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Operation } from 'src/entity/operation.entity';
import { ReadOperationQuery } from './query/read-operation.query';
import { CreateOperationCommand } from './command/create-operation.command';
import { ReadOperationByIdQuery } from './query/read-operation-by-id.query';
import { DeleteOperationCommand } from './command/delete-operation.command';
import { ReadOperationByStageQuery } from './query/read-operation-by-stage.query';
import { ReadOperationByActionQuery } from './query/read-operation-by-action.query';
import { RelateStageOperationCommand } from './command/relate-stage-operation.command';
import { CreateOperationDto } from 'src/dto/create-operation.dto';
import { ReadStageByIdQuery } from '../stage/query/read-stage-by-id.query';
import { Stage } from 'src/entity/stage.entity';

@Injectable()
export class OperationService {
    constructor(
      private readonly commandBus: CommandBus,
      private readonly queryBus: QueryBus
    ) { }

    async getOperation(): Promise<Operation[]> {
      return await this.queryBus.execute(new ReadOperationQuery({}));
    }

    async getOperationById(operationId: string): Promise<Operation> {
      return await this.queryBus.execute(new ReadOperationByIdQuery(operationId));
    }

    async getOperationByAction(actionId: string): Promise<Operation[]> {
      return await this.queryBus.execute(new ReadOperationByActionQuery(actionId));
    }

    async getOperationByStage(stageId: string): Promise<Operation[]> {
      return await this.queryBus.execute(new ReadOperationByStageQuery(stageId));
    }

    async createOperation(operationDto: CreateOperationDto): Promise<Operation> {
        const stage: Stage = await this.queryBus.execute(new ReadStageByIdQuery(operationDto.stageId))
        const operation: Operation = await this.commandBus.execute(new CreateOperationCommand(operationDto))
        await this.commandBus.execute(new RelateStageOperationCommand(stage, operation))

        return operation
    }

    async deleteOperation(operationId: string): Promise<Operation> {
      const operation = await this.getOperationById(operationId);
      return await this.commandBus.execute(new DeleteOperationCommand(operation))
    }
}
