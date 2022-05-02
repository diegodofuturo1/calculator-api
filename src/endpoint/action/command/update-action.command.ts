import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommandHandler, CommandHandler, ICommand } from '@nestjs/cqrs';
import { Action } from 'src/entity/action.entity';

export class UpdateActionCommand implements ICommand{
    constructor(
        public readonly oldAction: Action,
        public readonly newAction: Action,
    ) { }
}

@CommandHandler(UpdateActionCommand)
export class UpdateActionCommandHandler implements ICommandHandler<UpdateActionCommand> {

    constructor(
        @InjectRepository(Action)
        private readonly repository: Repository<Action>
    ) { }

    async execute(command: UpdateActionCommand): Promise<UpdateResult> {
        const { oldAction, newAction } = command

        return this.repository.update(oldAction, newAction)
    }
}