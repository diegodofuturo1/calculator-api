import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Stage } from "src/entity/stage.entity";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export class ReadStageQuery implements IQuery { }

@QueryHandler(ReadStageQuery)
export class ReadStageQueryHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Stage)
        private readonly repository: Repository<Stage>
    ) { }

    async execute(): Promise<Stage[]> {
        return await this.repository.find()
    }
}