import { Dept } from './../dept/dept.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CommonEntity } from '../../core/commonEntity';

@Entity()
export class User extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // @OneToOne((type) => Dept, {})
  // @JoinColumn({ referencedColumnName: 'id' })
  // dept: Dept;
  @Column()
  deptId: number;
  @Column()
  roleId: number;
  @Column({ length: 255 })
  name: string;
  @Column({ length: 255, default: '' })
  nickname: string;
  @Column({ length: 255, default: '' })
  realname: string;
  @Column({ length: 255 , default: ''})
  avatar: string;
  @Column({ default: 2})
  gender: number;
  @Column({ length: 255, default: '' })
  nationCode: string;
  @Column({ length: 255, default: '' })
  phone: string;
  @Column({default: 1})
  type: number;
  @Column({ length: 255, default: '' })
  email: string;
  @Column({ length: 255 })
  pass: string;

  @Column({ length: 255 })
  ip: string;
  @Column({ comment: '1用户注册2后台添加', default: 1 })
  mode: number;
  @Column({ comment: '正常0禁言', default: 1 })
  chatStatus: number;
}
