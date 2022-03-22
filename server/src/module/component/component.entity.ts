import { ComponentPropEntity } from './../component-prop/component-prop.entity';
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

@Entity({ name: 'component' })
export class ComponentEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ length: 20 })
  label: string;
  @Column({ length: 20 })
  developerName: string;
  @Column({ nullable: true, comment: '类型' })
  type: number;
  @Column({ nullable: true, comment: '分类' })
  cate: string;
  @Column({ nullable: true })
  desc: string;
  @OneToMany(
    () => ComponentPropEntity,
    (componentProp) => componentProp.component,
    {
      // cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'],
    },
  )
  propData: ComponentPropEntity[];
}
