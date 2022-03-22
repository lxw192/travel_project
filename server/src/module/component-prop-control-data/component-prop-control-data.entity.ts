import { ComponentPropControlEntity } from './../component-prop-control/component-prop-control.entity';
import { CommonEntity } from '../../core/commonEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'component_prop_control_data' })
export class ComponentPropControlDataEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  componentId: number;
  @Column()
  name: string;

  @Column({ nullable: true }) //TODO 必填项？
  value: string;
  @ManyToOne(() => ComponentPropControlEntity, (control) => control.propData)
  control: ComponentPropControlEntity;
}
