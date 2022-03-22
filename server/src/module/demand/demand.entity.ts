import { CommonEntity } from '../../core/commonEntity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Demand extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: number;
  @Column({ length: 255 })
  name: string;
  @Column()
  level: number;
  @Column({})
  desc: string;
  @Column({
    comment:
      '1h5 2pc 3android 4ios 5微信公众号 6微信小程序 7支付宝小程序8 百度小程序',
  })
  siteType: number;
  @Column({ comment: '', default: 1 })
  status: number;
  @Column({})
  productId: number;
  @Column({})
  moduleId: number;
  @Column({ length: 255 })
  prdUrl: string;
  @Column({ length: 255 })
  uiUrl: string;
  @Column({ length: 255 })
  interUrl: string;
  @Column({ length: 255 })
  testCaseUrl: string;

  @Column({})
  createUserId: number;
  @Column({})
  productUserId: number;
  @Column({})
  webUserId: number;
  @Column({})
  serverUserId: number;
  @Column({})
  testUserId: number;

  @Column({ length: 20 })
  demandStartAt: string;
  @Column({ length: 20 })
  demandEndAt: string;
  @Column({ length: 20 })
  uiStartAt: string;
  @Column({ length: 20 })
  uiEndAt: string;
  @Column({ length: 20 })
  devStartAt: string;
  @Column({ length: 20 })
  devEndAt: string;
  @Column({ length: 20 })
  webStartAt: string;
  @Column({ length: 20 })
  webEndAt: string;
  @Column({ length: 20 })
  serverStartAt: string;
  @Column({ length: 20 })
  serverEndAt: string;
  @Column({ length: 20 })
  jointStartAt: string;
  @Column({ length: 20 })
  jointEndAt: string;
  @Column({ length: 20 })
  testStartAt: string;
  @Column({ length: 20 })
  testEndAt: string;
  @Column({ length: 20 })
  preOnlineStartAt: string;
  @Column({ length: 20 })
  preOnlineEndAt: string;
  @Column({ length: 20 })
  onlineAt: string;
}
