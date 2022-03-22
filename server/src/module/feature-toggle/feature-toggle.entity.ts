
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { CommonEntity } from '../../core/commonEntity';

enum Status {
  creating= 1,
  created= 2,
  deleting= 3,
  deleted= 4,
}

@Entity({ name: 'feature-toggle' })
export class FeatureToggle extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '特性开关名称' })
  name: string;

  @Column({ comment: '标识' })
  moduleKey: string;

  @Column({ nullable: true, comment: '所属视图ID' })
  viewId: string;
  @Column({ nullable: true, comment: '所属视图' })
  viewUrl: string;
  
  @Column({ nullable: true, comment: '维护人' })
  maintainer: string;

  @Column({ nullable: true, comment: '版本', default: 1 })
  version: string;

  @Column({ nullable: true, comment: '所属产品id' })
  productId: string;
  @Column({ nullable: true, comment: '所属产品名称' })
  productName: string;

  @Column({ nullable: true, comment: '所属团队id' })
  teamId: string;
  @Column({ nullable: true, comment: '所属团队' })
  teamName: string;

  @Column({ nullable: true, comment: '工作平台' })
  environment: string;

  @Column({ default: 1 })
  status: Status;
}