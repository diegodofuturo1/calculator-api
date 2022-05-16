import { Repository } from "typeorm";
import { Action } from "src/entity/action.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ActionOperation } from "src/entity/action-operation.entity";
import { Operation } from "src/entity/operation.entity";
import { ActionDto } from "src/dto/action.dto";

export class ReadActionOperationByStageQuery implements IQuery {
    constructor (
        public readonly stageId: string
    ) { }
}

@QueryHandler(ReadActionOperationByStageQuery)
export class ReadActionOperationByStageQueryHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Action)
        private readonly actionRepository: Repository<Action>,
        @InjectRepository(ActionOperation)
        private readonly actionOperationRepository: Repository<ActionOperation>,
        @InjectRepository(Operation)
        private readonly operationRepository: Repository<Operation>
    ) { }

    async execute(query: ReadActionOperationByStageQuery): Promise<ActionDto[]> {
        const { stageId } = query
        const actions = await this.actionRepository.find({ stageId })

        const promises = actions.map(async action => {
            const actionId = action.id

            const relations = await this.actionOperationRepository.find({ actionId })

            const promises = relations.map(async relate => await this.operationRepository.findOne({ id: relate.operationId }))

            const operations = await Promise.all(promises)

            return {
                ...action,
                operations
            }
        })
        
        return await Promise.all(promises)
    }

}