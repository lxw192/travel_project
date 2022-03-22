import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { CommonEntity } from '../../core/commonEntity';

@Entity({ name: 'control_field' })
export class ControlFieldEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  type: number;
  @Column()
  desc: string;
}
