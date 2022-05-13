import { Injectable } from '@nestjs/common';
import { Stage } from 'src/entity/stage.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ReadStageQuery } from './query/read-stage.query';
import { CreateStageCommand } from './command/create-stage.command';
import { DeleteStageCommand } from './command/delete-stage.command';
import { ReadStageByIdQuery } from './query/read-stage-by-id.query';
import { UpdateStageCommand } from './command/update-stage.command';
import { ReadStageByLevelQuery } from './query/read-stage-by-level.query';

@Injectable()
export class StageService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    async getStage(): Promise<Stage[]> {
        return await this.queryBus.execute(new ReadStageQuery());
    }

    async getStageById(id: string): Promise<Stage> {
        return await this.queryBus.execute(new ReadStageByIdQuery(id));
    }

    async createStage(stage: Stage): Promise<Stage> {
        try {
            const { id } = await this.queryBus.execute(new ReadStageByLevelQuery(stage.level))
            return this.updateStage({ ...stage, id })
        }
        catch {
            return await this.commandBus.execute(new CreateStageCommand(stage))
        }
    }

    async updateStage(newStage: Stage): Promise<Stage> {
        const oldStage = await this.queryBus.execute(new ReadStageByIdQuery(newStage.id))
        return await this.commandBus.execute(new UpdateStageCommand(oldStage, newStage))
    }
    
    async deleteStage(stage: Stage): Promise<Stage> {
        return await this.commandBus.execute(new DeleteStageCommand(stage))
    }
}
