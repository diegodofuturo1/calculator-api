import { ICommandHandler, CommandHandler, ICommand } from '@nestjs/cqrs';
import { Operation } from 'src/entity/operation.entity';
import { Stage } from 'src/entity/stage.entity';

export class CalculatorCommand implements ICommand{
    constructor(
        public readonly stage: Stage,
        public readonly operations: Operation[]
    ) { }
}

@CommandHandler(CalculatorCommand)
export class CalculatorCommandHandler implements ICommandHandler<CalculatorCommand> {
    private run = [
        (a: number, b: number) => a + b,
        (a: number, b: number) => a - b,
        (a: number, b: number) => a / b,
        (a: number, b: number) => a * b,
    ]

    async execute(event: CalculatorCommand): Promise<{ result: number, correct: boolean }> {
        const { stage, operations } = event
        const { start, end } = stage
        
        const result: number = operations.reduce((value, operation) => {
            console.log('[TYPE]', operation.type)
            console.log('[RUN]', this.run)
            console.log('[FUNCTION]', this.run[operation.type])
            return this.run[operation.type](value, operation.value)
        }, start)

        console.log('[RESULT]', result)

        return { result, correct: end == result }
    }
}