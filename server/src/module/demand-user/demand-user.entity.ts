import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { CommonEntity } from '../../core/commonEntity';

@Entity()
export class DemandUser extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  demandId: number;
  @Column()
  userId: number;
  @Column()
  deptId: number;
  @Column({ length: 20 })
  startAt: string;
  @Column({ length: 20 })
  endAt: string;
}
