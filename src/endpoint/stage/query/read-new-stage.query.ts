import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Stage } from "src/entity/stage.entity";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export class ReadNewStageQuery implements IQuery { }

@QueryHandler(ReadNewStageQuery)
export class ReadNewStageQueryHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Stage)
        private readonly repository: Repository<Stage>
    ) { }

    async execute(): Promise<Partial<Stage>> {
        const [ stage ] = await this.repository.query('SELECT *, MAX(`Level`) + 1 AS `next` FROM Stage')
        const { next } = stage
        const entity = this.repository.create({ level: next ?? 1 }) 
        return this.repository.save(entity)
    }
}