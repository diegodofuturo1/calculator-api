import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Operation } from "src/entity/operation.entity";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export class ReadOperationByStageQuery implements IQuery {
    constructor (
        public readonly stageId: string
    ) { }
}

@QueryHandler(ReadOperationByStageQuery)
export class ReadOperationByStageQueryHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Operation)
        private readonly repository: Repository<Operation>
    ) { }

    async execute(query: ReadOperationByStageQuery): Promise<Operation[]> {
        const { stageId } = query

        const operations = await this.repository
            .createQueryBuilder('O')
            .innerJoin('StageOperation', 'S', 'O.id = S.operationId')
            .where('S.stageId = :stageId', { stageId })
            .getMany()

        if (!operations || !operations.length)
            throw { statusCode: 404, message: 'Nenhuma operação encontrada' }

        return operations
    }

}