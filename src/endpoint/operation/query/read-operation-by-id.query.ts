import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Operation } from "src/entity/operation.entity";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export class ReadOperationByIdQuery implements IQuery {
    constructor (
        public readonly id: string
    ) { }
}

@QueryHandler(ReadOperationByIdQuery)
export class ReadOperationByIdQueryHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Operation)
        private readonly repository: Repository<Operation>
    ) { }

    async execute(query: ReadOperationByIdQuery): Promise<Operation> {
        return await this.repository.findOne(query.id)
    }

}