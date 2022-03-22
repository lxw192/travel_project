import { CommonEntity } from '../../core/commonEntity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

@Entity({name: 'page'})
export class PageEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({default: ''})
  label: string;
  @Column()
  path: string;
  @Column({type: 'json'})
  params: string;
  @Column({type: 'json'})
  template: string;
  @Column({type: 'json'})
  children: string;
  @Column({ length: 20, default: '' })
  developerName: string;
  @Column({ length: 20, default: 'web' })
  type: string;
}
