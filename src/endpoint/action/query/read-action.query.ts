import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Action } from "src/entity/action.entity";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export interface ReadActionFilter {
    actionId?: string
    stageId?: string
}

export class ReadActionQuery implements IQuery {
    constructor (
        public readonly filter: ReadActionFilter
    ) { }
}

@QueryHandler(ReadActionQuery)
export class ReadActionQueryHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Action)
        private readonly repository: Repository<Action>
    ) { }

    async execute(query: ReadActionQuery): Promise<Action[]> {

        if (query.filter?.actionId) {

        }

        if (query.filter?.stageId) {

        }

        return await this.repository.find()
    }

}