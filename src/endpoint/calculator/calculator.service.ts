import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Action } from "src/entity/action.entity";
import { Stage } from "src/entity/stage.entity";
import { UpdateActionCommand } from "../action/command/update-action.command";
import { ReadActionByIdQuery } from "../action/query/read-action-by-id.query";
import { ReadOperationByActionQuery } from "../operation/query/read-operation-by-action.query";
import { ReadStageByIdQuery } from "../stage/query/read-stage-by-id.query";
import { CalculatorCommand } from "./command/calculator.command";

@Injectable()
export class CalculatorService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    async calculator(stageId: string, actionId: string) {
        const [ stage, action ]: [ Stage, Action ] = await Promise.all([
            this.queryBus.execute(new ReadStageByIdQuery(stageId)),
            this.queryBus.execute(new ReadActionByIdQuery(actionId)),
        ])

        if (stage.id != action.stageId)
            throw { statusCode: 400, message: 'Stage ou Action não encontrada' }

        const operations = await this.queryBus.execute(new ReadOperationByActionQuery(action.id))
        
        const response = await this.commandBus.execute(new CalculatorCommand(stage, operations))
        console.log('[RESPONSE]', response)
        const { result, correct } = response
        return await this.commandBus.execute(new UpdateActionCommand(action, { ...action, result, correct }))
    }
}