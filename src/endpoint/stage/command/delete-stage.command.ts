import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommandHandler, CommandHandler, ICommand } from '@nestjs/cqrs';
import { Stage } from 'src/entity/stage.entity';

export class DeleteStageCommand implements ICommand{
    constructor(
        public readonly stage: Stage
    ) { }
}

@CommandHandler(DeleteStageCommand)
export class DeleteStageCommandHandler implements ICommandHandler<DeleteStageCommand> {

    constructor(
        @InjectRepository(Stage)
        private readonly repository: Repository<Stage>
    ) { }

    async execute(command: DeleteStageCommand): Promise<DeleteResult> {
        const { stage } = command

        return await this.repository.delete(stage)
    }
}