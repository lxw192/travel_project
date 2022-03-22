import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { CommonEntity } from '../../core/commonEntity';

@Entity({ name: 'config_type' })
export class ConfigTypeEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ length: 20 })
  label: string;
}
