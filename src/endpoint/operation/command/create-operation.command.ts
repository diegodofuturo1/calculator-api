import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommandHandler, CommandHandler, ICommand } from '@nestjs/cqrs';
import { Operation } from 'src/entity/operation.entity';
import { CreateOperationDto } from 'src/dto/create-operation.dto';
import { StageOperation } from 'src/entity/stage-operation.entity';

export class CreateOperationCommand implements ICommand{
    constructor(
        public readonly operationDto: CreateOperationDto
    ) { }
}

@CommandHandler(CreateOperationCommand)
export class CreateOperationCommandHandler implements ICommandHandler<CreateOperationCommand> {

    constructor(
        @InjectRepository(Operation)
        private readonly repository: Repository<Operation>,
        @InjectRepository(StageOperation)
        private readonly repositoryStageOperation: Repository<StageOperation>,
    ) { }

    async execute(command: CreateOperationCommand): Promise<Operation> {
        const { operationDto } = command
        const { type, value } = operationDto
        
        const entity = this.repository.create({ value, type  })
        const operation = await this.repository.save(entity)

        if (!operation)
            throw { statusCode: 400, message: 'Não foi possível criar Operation' }

        return operation        
    }
}