import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Command {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stageId: string;

  @Column()
  result: number;
}
