import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ActionOperation')
export class ActionOperation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  operationId: string;

  @Column()
  actionId: string;
}
