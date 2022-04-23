import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommandHandler, CommandHandler, ICommand } from '@nestjs/cqrs';
import { Operation } from 'src/entity/operation.entity';

export class CreateOperationCommand implements ICommand{
    constructor(
        public readonly operation: Operation
    ) { }
}

@CommandHandler(CreateOperationCommand)
export class CreateOperationCommandHandler implements ICommandHandler<CreateOperationCommand> {

    constructor(
        @InjectRepository(Operation)
        private readonly repository: Repository<Operation>
    ) { }

    async execute(command: CreateOperationCommand): Promise<Operation> {
        const { operation } = command

        return this.repository.save(this.repository.create(operation))
    }
}