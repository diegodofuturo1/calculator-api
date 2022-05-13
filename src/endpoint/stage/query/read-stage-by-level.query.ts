import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Stage } from "src/entity/stage.entity";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export class ReadStageByLevelQuery implements IQuery { 
    constructor(
        public readonly level: number
    ) { }    
}

@QueryHandler(ReadStageByLevelQuery)
export class ReadStageByLevelQueryHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Stage)
        private readonly repository: Repository<Stage>
    ) { }

    async execute(query: ReadStageByLevelQuery): Promise<Stage> {
        const { level } = query

        console.log('LEVEL', level)
        
        if (level <= 0)
        throw { statusCode: 404, message: 'Stage não encontrado' }
        
        const stage = await this.repository.findOne({ level })
        console.log('STAGE', stage)

        if (!stage)
            throw { statusCode: 404, message: 'Stage não encontrado' }

        return stage
    }
}