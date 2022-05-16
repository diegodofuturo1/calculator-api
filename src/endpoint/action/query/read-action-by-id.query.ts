import { Repository } from "typeorm";
import { Action } from "src/entity/action.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export class ReadActionByIdQuery implements IQuery {
    constructor (
        public readonly id: string
    ) { }
}

@QueryHandler(ReadActionByIdQuery)
export class ReadActionByIdQueryHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Action)
        private readonly repository: Repository<Action>
    ) { }

    async execute(query: ReadActionByIdQuery): Promise<Action> {
        const { id } = query
        
        const action =  await this.repository.findOne({ id })
        
        if (!action)
            throw { statusCode: 404, message: 'Action não encontrada' }
        
        return action
    }
}