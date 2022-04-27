import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommandHandler, CommandHandler, ICommand } from '@nestjs/cqrs';
import { Stage } from 'src/entity/stage.entity';

export class CreateStageCommand implements ICommand{
    constructor(
        public readonly stage: Stage
    ) { }
}

@CommandHandler(CreateStageCommand)
export class CreateStageCommandHandler implements ICommandHandler<CreateStageCommand> {

    constructor(
        @InjectRepository(Stage)
        private readonly repository: Repository<Stage>
    ) { }

    async execute(command: CreateStageCommand): Promise<Stage> {
        const { stage } = command

        return this.repository.save(this.repository.create(stage))
    }
}