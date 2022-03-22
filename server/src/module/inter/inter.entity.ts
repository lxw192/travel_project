import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommonEntity } from '../../core/commonEntity';

@Entity({ name: 'inter' })
export class InterEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ length: 255 })
  url: string;
  @Column({ length: 20 })
  developerName: string;
  @Column({ nullable: true })
  type: number;
  @Column({ nullable: true })
  desc: string;
  @Column('json')
  reqData: string;
  @Column('json')
  resData: string;
}
