import { Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Stage } from "src/entity/stage.entity";
import { ICommand, ICommandHandler, CommandHandler } from "@nestjs/cqrs";

export class UpdateStageCommand implements ICommand { 
    constructor(
        public readonly oldStage: Stage,
        public readonly newStage: Stage,
    ) { }    
}

@CommandHandler(UpdateStageCommand)
export class UpdateStageCommandHandler implements ICommandHandler {

    constructor(
        @InjectRepository(Stage)
        private readonly repository: Repository<Stage>
    ) { }

    async execute(query: UpdateStageCommand): Promise<Stage> {
        const { oldStage, newStage } = query
        const result: UpdateResult = await this.repository.update(oldStage, newStage)

        if (!result.affected)
            throw { message: 'Não foi possível salvar Stage', statusCode: 400 }

        return { ...oldStage, ...newStage }
    }
}