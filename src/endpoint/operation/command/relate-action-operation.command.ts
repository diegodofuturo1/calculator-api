import { Repository } from 'typeorm';
import { Action } from 'src/entity/action.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Operation } from 'src/entity/operation.entity';
import { ActionOperation } from 'src/entity/action-operation.entity';
import { ICommandHandler, CommandHandler, ICommand } from '@nestjs/cqrs';

export class RelateActionOperationCommand implements ICommand{
    constructor(
        public readonly action: Action,
        public readonly operation: Operation,
    ) { }
}

@CommandHandler(RelateActionOperationCommand)
export class RelateActionOperationCommandHandler implements ICommandHandler<RelateActionOperationCommand> {

    constructor(
        @InjectRepository(ActionOperation)
        private readonly repository: Repository<ActionOperation>,
    ) { }

    async execute(command: RelateActionOperationCommand): Promise<ActionOperation> {
        const { action, operation } = command;
 
        const entity = this.repository.create({ actionId: action.id, operationId: operation.id });

        return await this.repository.save(entity);
    }
}