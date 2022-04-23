import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Stage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  start: number;

  @Column()
  level: number;

  @Column()
  end: number;

  @Column()
  times: number;
}
