import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommandHandler, CommandHandler, ICommand } from '@nestjs/cqrs';
import { Action } from 'src/entity/action.entity';

export class CreateActionCommand implements ICommand{
    constructor(
        public readonly action: Action
    ) { }
}

@CommandHandler(CreateActionCommand)
export class CreateActionCommandHandler implements ICommandHandler<CreateActionCommand> {

    constructor(
        @InjectRepository(Action)
        private readonly repository: Repository<Action>
    ) { }

    async execute(command: CreateActionCommand): Promise<Action> {
        const { action } = command

        return this.repository.save(this.repository.create(action))
    }
}