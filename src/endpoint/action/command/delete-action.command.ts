import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommandHandler, CommandHandler, ICommand } from '@nestjs/cqrs';
import { Action } from 'src/entity/action.entity';

export class DeleteActionCommand implements ICommand{
    constructor(
        public readonly action: Action
    ) { }
}

@CommandHandler(DeleteActionCommand)
export class DeleteActionCommandHandler implements ICommandHandler<DeleteActionCommand> {

    constructor(
        @InjectRepository(Action)
        private readonly repository: Repository<Action>
    ) { }

    async execute(command: DeleteActionCommand): Promise<DeleteResult> {
        const { action } = command

        return this.repository.delete(this.repository.create(action))
    }
}