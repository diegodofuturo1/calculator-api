import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Stage } from "src/entity/stage.entity";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export class ReadStageByIdQuery implements IQuery { 
    constructor(
        public readonly id: string
    ) { }    
}

@QueryHandler(ReadStageByIdQuery)
export class ReadStageByIdQueryHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Stage)
        private readonly repository: Repository<Stage>
    ) { }

    async execute(query: ReadStageByIdQuery): Promise<Stage> {
        const { id } = query
        return await this.repository.findOne({ id })
    }
}