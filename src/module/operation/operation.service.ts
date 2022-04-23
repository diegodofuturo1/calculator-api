import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Operation } from 'src/entity/operation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OperationService {
    constructor(
        @InjectRepository(Operation) private repository: Repository<Operation>
    ) { }

    async getOperation(): Promise<Operation[]> {
      return await this.repository.find();
    }
    async createOperation(operation: Operation): Promise<Operation> {
      const entity = this.repository.create(operation);
      return await this.repository.save(entity)
    }
}
