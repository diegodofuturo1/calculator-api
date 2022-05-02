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
        const stage = await this.repository.findOne({ id })

        if (!stage)
            throw { statusCode: 404, message: 'Stage não encontrado' }

        return stage
    }
}