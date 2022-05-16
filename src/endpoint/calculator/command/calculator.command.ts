import { ICommandHandler, CommandHandler, ICommand } from '@nestjs/cqrs';
import { Operation } from 'src/entity/operation.entity';
import { Stage } from 'src/entity/stage.entity';
import { ActionType } from 'src/type/action.type';

export class CalculatorCommand implements ICommand{
    constructor(
        public readonly stage: Stage,
        public readonly operations: Operation[]
    ) { }
}

@CommandHandler(CalculatorCommand)
export class CalculatorCommandHandler implements ICommandHandler<CalculatorCommand> {
    private run = {
        addition: (a: number, b: number) => a + b,
        substract: (a: number, b: number) => a - b,
        divisor: (a: number, b: number) => a / b,
        multiplicate: (a: number, b: number) => a * b,
    }

    async execute(event: CalculatorCommand): Promise<{ result: number, status: ActionType }> {
        const { stage, operations } = event
        const { start, end } = stage
        
        const result: number = operations.reduce((value, operation) => {
            return this.run[operation.type](value, operation.value)
        }, start)

        return { result, status: end == result ? 'correct' : 'incorrect' }
    }
}