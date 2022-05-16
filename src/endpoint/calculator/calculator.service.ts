import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Action } from "src/entity/action.entity";
import { Operation } from "src/entity/operation.entity";
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

    async calculator(actionId: string) {
        const action: Action = await this.queryBus.execute(new ReadActionByIdQuery(actionId))        
        const stage: Stage = await this.queryBus.execute(new ReadStageByIdQuery(action.stageId))
        const operations: Operation[] = await this.queryBus.execute(new ReadOperationByActionQuery(action.id))
        const { result, status } = await this.commandBus.execute(new CalculatorCommand(stage, operations))
        await this.commandBus.execute(new UpdateActionCommand(action, { ...action, result, status }))
        return { ...action, result, status }
    }
}