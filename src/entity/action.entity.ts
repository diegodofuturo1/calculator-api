import { ActionType } from 'src/type/action.type';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Action')
export class Action {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stageId: string;

  @Column({ nullable: true })
  result: number;

  @Column({ default: 'created' })
  status: ActionType;
}
