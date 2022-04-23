import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { operation } from '../type/operation.type';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @Column()
  type: operation;
}
