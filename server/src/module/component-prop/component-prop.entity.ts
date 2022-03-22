import { ComponentPropControlEntity } from './../component-prop-control/component-prop-control.entity';
import { CommonEntity } from '../../core/commonEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { ComponentEntity } from '../component/component.entity';

@Entity({ name: 'component_prop' })
@Tree('closure-table')
export class ComponentPropEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  parentId: number;
  @Column()
  componentId: number;
  @Column()
  dataType: string;
  @Column()
  groupId: number;
  @Column({ nullable: true })
  order: number;
  @Column()
  name: string;
  @Column()
  label: string;
  @OneToMany(
    () => ComponentPropControlEntity,
    (control) => control.componentProp,
    {
      // cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'],
    },
  )
  controls: ComponentPropControlEntity[];
  @Column({ nullable: true })
  value: string;
  @Column()
  defaultValue: string;
  @Column()
  desc: string;

  @ManyToOne(() => ComponentEntity, (component) => component.propData)
  // @JoinColumn({ name: 'component_id' })
  component: ComponentEntity;

  @TreeChildren({
    cascade: ['insert', 'update', 'soft-remove', 'remove', 'recover'],
  })
  children: ComponentPropEntity[];
  @TreeParent({ onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'pid' })
  parent: ComponentPropEntity;
}
