import { ComponentPropControlDataEntity } from './../component-prop-control-data/component-prop-control-data.entity';
import { ComponentPropEntity } from './../component-prop/component-prop.entity';
import { CommonEntity } from '../../core/commonEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'component_prop_control' })
export class ComponentPropControlEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  componentId: number;
  @Column({ comment: '其实就是组件name', nullable: true })
  name: string;
  @ManyToOne(
    () => ComponentPropEntity,
    (componentProp) => componentProp.controls,
    {
      // cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'],
    },
  )
  componentProp: ComponentPropEntity;
  @OneToMany(
    () => ComponentPropControlDataEntity,
    (propData) => propData.control,
    {
      // cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'],
    },
  )
  propData: ComponentPropControlDataEntity[];
}
