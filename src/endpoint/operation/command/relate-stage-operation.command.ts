import { Repository } from 'typeorm';
import { Stage } from 'src/entity/stage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Operation } from 'src/entity/operation.entity';
import { StageOperation } from 'src/entity/stage-operation.entity';
import { ICommandHandler, CommandHandler, ICommand } from '@nestjs/cqrs';

export class RelateStageOperationCommand implements ICommand{
    constructor(
        public readonly stage: Stage,
        public readonly operation: Operation,
    ) { }
}

@CommandHandler(RelateStageOperationCommand)
export class RelateStageOperationCommandHandler implements ICommandHandler<RelateStageOperationCommand> {

    constructor(
        @InjectRepository(StageOperation)
        private readonly repository: Repository<StageOperation>,
    ) { }

    async execute(command: RelateStageOperationCommand): Promise<StageOperation> {
        const { stage, operation } = command;
 
        const entity = this.repository.create({ stageId: stage.id, operationId: operation.id });

        const stageOperation = await this.repository.save(entity);

        if (!stageOperation)
            throw { statusCode: 404, message: 'Não foi possível relacionar Stage com Operation' }

        return stageOperation
    }
}