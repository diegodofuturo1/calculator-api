import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Operation } from "src/entity/operation.entity";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export interface ReadOperationFilter {
    actionId?: string
    stageId?: string
}

export class ReadOperationQuery implements IQuery {
    constructor (
        public readonly filter: ReadOperationFilter
    ) { }
}

@QueryHandler(ReadOperationQuery)
export class ReadOperationQueryHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Operation)
        private readonly repository: Repository<Operation>
    ) { }

    async execute(query: ReadOperationQuery): Promise<Operation[]> {

        if (query.filter?.actionId) {

        }

        if (query.filter?.stageId) {

        }

        return await this.repository.find()
    }

}