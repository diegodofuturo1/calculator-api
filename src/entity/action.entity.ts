import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Action')
export class Action {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stageId: string;

  @Column()
  result: number;

  @Column({ default: false })
  correct: boolean;
}
