import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommandHandler, CommandHandler, ICommand } from '@nestjs/cqrs';
import { Action } from 'src/entity/action.entity';
import { Stage } from 'src/entity/stage.entity';
import { Operation } from 'src/entity/operation.entity';
import { ActionOperation } from 'src/entity/action-operation.entity';

export class CreateActionCommand implements ICommand {
    constructor(
        public readonly stage: Stage,
        public readonly operations: Operation[]
    ) { }
}

@CommandHandler(CreateActionCommand)
export class CreateActionCommandHandler implements ICommandHandler<CreateActionCommand> {

    constructor(
        @InjectRepository(Action)
        private readonly repositoryAction: Repository<Action>,
        @InjectRepository(ActionOperation)
        private readonly repositoryActionOperation: Repository<ActionOperation>
    ) { }

    createOperations(operations: Operation[], times: number): string[][] {
        
        const indexes: number[] = new Array(times).fill(0)
        const list: string[][] = []

        const ended = () => {
            return !indexes.find(index => !!index)
        }

        const next = () => {
            for (let i = 0; i < times; i++) {
                indexes[i]++
                if (indexes[i] >= operations.length)
                    indexes[i] = 0
                else
                    break
            }
        }

        do {
            const ids: string[] = []

            for (let i = 0; i < times; i++) {
                ids.push(operations[indexes[i]].id)
            }

            list.push(ids)

            next()
        } while (!ended())

        return list
    }

    async execute(command: CreateActionCommand): Promise<any> {
        const { stage, operations } = command

        const list = this.createOperations(operations, stage.times)

        const promises = list.map(async operationIds => {
            const entity = this.repositoryAction.create({ stageId: stage.id })
            const action = await this.repositoryAction.save(entity)

            const _operations = await Promise.all(operationIds.map(async (operationId: string, order: number) => {
                const actionId = action.id
                const entity = this.repositoryActionOperation.create({ actionId, operationId, order })
                const actionOperation = await this.repositoryActionOperation.save(entity)

                const operation = operations.find(operation => operation.id == actionOperation.operationId)
                
                return { 
                    ...operation,
                    order: actionOperation.order,
                    actionId: actionOperation.actionId,
                }
            }))

            return { ...action, operations: _operations }
        })

        return await Promise.all(promises)
    }
}