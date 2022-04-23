import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ActionOperation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  operationId: string;

  @Column()
  actionId: string;
}
