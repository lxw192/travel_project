import * as dayjs from 'dayjs';
import {
  AfterLoad,
  BeforeInsert,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity {
  @Column({ default: 1 })
  status: number;

  @UpdateDateColumn()
  updatedAt: Date;
  @CreateDateColumn()
  createdAt: Date;

  @AfterLoad()
  updateDates() {
    this.updatedAt = (dayjs(
      new Date(this.updatedAt),
    ).valueOf() as unknown) as Date;

    this.createdAt = (dayjs(
      new Date(this.createdAt),
    ).valueOf() as unknown) as Date;
  }
  @BeforeInsert()
  updateDates2() {
    this.updatedAt = dayjs(this.updatedAt).toDate();

    this.createdAt = dayjs(this.createdAt).toDate();
  }
}
