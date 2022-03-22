import { CommonEntity } from '../../core/commonEntity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Admin extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 255 })
  name: string;
  @Column({ length: 255 })
  nickname: string;
  @Column({ length: 20 })
  phone: string;
  @Column({ length: 255 })
  email: string;
  @Column({ length: 255 })
  avatar: string;
  @Column()
  pass: string;
}
