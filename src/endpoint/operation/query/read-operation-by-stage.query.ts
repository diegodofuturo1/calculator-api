import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Operation } from "src/entity/operation.entity";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export class ReadOperationByStageQuery implements IQuery {
    constructor (
        public readonly id: string
    ) { }
}

@QueryHandler(ReadOperationByStageQuery)
export class ReadOperationByStageQueryHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Operation)
        private readonly repository: Repository<Operation>
    ) { }

    async execute(query: ReadOperationByStageQuery): Promise<Operation> {
        return await this.repository.findOne(query.id)
    }

}