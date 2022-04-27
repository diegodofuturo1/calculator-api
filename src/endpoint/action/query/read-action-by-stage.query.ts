import { Repository } from "typeorm";
import { Action } from "src/entity/action.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export class ReadActionByStageQuery implements IQuery {
    constructor (
        public readonly stageId: string
    ) { }
}

@QueryHandler(ReadActionByStageQuery)
export class ReadActionByStageQueryHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Action)
        private readonly repository: Repository<Action>
    ) { }

    async execute(query: ReadActionByStageQuery): Promise<Action[]> {
        const { stageId } = query
        return await this.repository.find({ stageId })
    }

}