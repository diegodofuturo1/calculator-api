import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StageOperation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  operationId: string;

  @Column()
  stageId: string;
}
