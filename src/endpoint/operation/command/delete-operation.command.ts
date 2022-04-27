import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommandHandler, CommandHandler, ICommand } from '@nestjs/cqrs';
import { Operation } from 'src/entity/operation.entity';

export class DeleteOperationCommand implements ICommand{
    constructor(
        public readonly operation: Operation
    ) { }
}

@CommandHandler(DeleteOperationCommand)
export class DeleteOperationCommandHandler implements ICommandHandler<DeleteOperationCommand> {

    constructor(
        @InjectRepository(Operation)
        private readonly repository: Repository<Operation>
    ) { }

    async execute(command: DeleteOperationCommand): Promise<DeleteResult> {
        const { operation } = command

        return await this.repository.delete(operation)
    }
}