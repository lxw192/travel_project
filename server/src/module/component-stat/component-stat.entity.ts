import { CommonEntity } from '../../core/commonEntity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { extendProp } from '../../utils/extendProp';

@Entity({name: 'component_stat'})
export class ComponentStatEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  projectName: string;
  @Column()
  baseUrl: string;
  @extendProp({label: '组件名称', unit: ''})
  @Column()
  componentName: string;
  @Column()
  url: string;
  @extendProp({label: '页面访问次数'})
  @Column()
  count: number;
  @Column({default: ''})
  desc?: string;
}
