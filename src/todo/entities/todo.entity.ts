import { Time } from '../../helpers/Time.helper';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoStatusEnum } from '../todo.statusenum';

@Entity('todo')
export class TodoEntity extends Time {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting,
  })
  status: TodoStatusEnum;
}
