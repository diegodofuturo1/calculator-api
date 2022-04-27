import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Operation } from "src/entity/operation.entity";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export class ReadOperationByActionQuery implements IQuery {
    constructor (
        public readonly actionId: string
    ) { }
}

@QueryHandler(ReadOperationByActionQuery)
export class ReadOperationByActionQueryHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Operation)
        private readonly repository: Repository<Operation>
    ) { }

    async execute(query: ReadOperationByActionQuery): Promise<Operation[]> {
        const { actionId } = query

        const operations = await this.repository
            .createQueryBuilder('R')
            .innerJoin('ActionOperation', 'A', 'R.id = A.operationId')
            .where('A.id = :actionID', { actionId })
            .getMany()

        return operations
    }

}