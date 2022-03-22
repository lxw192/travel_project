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

@Entity({ name: 'config' })
export class ConfigEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // @OneToOne(type => InterEntity, { eager: true })
  // @JoinColumn()
  // inter: InterEntity;
  @Column({ name: 'interId' })
  interId: number;
  @Column()
  name: string;
  @Column({ length: 20 })
  developerName: string;
  @Column({ length: 20 })
  type: string;
  @Column('json')
  configData: string;
}
