import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OperationType } from '../type/operation.type';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @Column()
  type: OperationType;
}
