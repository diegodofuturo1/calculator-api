import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CommandOperation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  operationId: string;

  @Column()
  commandId: string;
}
