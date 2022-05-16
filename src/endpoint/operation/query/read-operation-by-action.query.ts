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

        const operations = await this.repository.query(
            'SELECT * FROM `Operation` `O` INNER JOIN `ActionOperation` `A` ON `A`.`operationId` = `O`.`id` WHERE `A`.`actionId` = ?',
             [ actionId ]
        )

        if (!operations || !operations.length)
            throw { statusCode: 404, message: 'Nenhuma Operation encontrada' }

        return operations
    }

}