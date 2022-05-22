import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Stage')
export class Stage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  start: number;

  @Column({ nullable: false })
  level: number;

  @Column({ default: 0 })
  end: number;

  @Column({ default: 1 })
  times: number;

  @Column({ default: 'created' })
  status: string;
}
