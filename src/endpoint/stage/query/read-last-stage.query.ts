import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Stage } from "src/entity/stage.entity";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export class ReadLastStageQuery implements IQuery { }

@QueryHandler(ReadLastStageQuery)
export class ReadLastStageQueryHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Stage)
        private readonly repository: Repository<Stage>
    ) { }

    async execute(): Promise<Partial<Stage>> {
        const [ stage ] = await this.repository.query('SELECT *, MAX(`Level`) AS `last` FROM Stage')
        return stage
    }
}