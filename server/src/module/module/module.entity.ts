import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { CommonEntity } from '../../core/commonEntity';

@Entity()
export class Module extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  productId: number;
  @Column()
  name: string;
}
