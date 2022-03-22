import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { CommonEntity } from '../../core/commonEntity';

@Entity()
export class OperateLog extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  moduleId: string;
  @Column()
  desc: string;
}
