import { ObjectLiteral } from './../../interface/common';
import { BaseService } from './../../core/service';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageData } from '../../common/Http';
import dayjs = require('dayjs');
@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) {
    super();
  }

  async stat(startTime, endTime): Promise<number> {
    return this.repository
      .createQueryBuilder('video')
      .where('createdAt between :startTime and :endTime', {
        startTime,
        endTime,
      })
      .getCount();
  }

  async page(
    pageSize: number = 1,
    page: number = 1,
    ts: number = dayjs().valueOf(),
    where?: ObjectLiteral,
    columns?: string[],
  ): Promise<PageData<User>> {
    const sqlBuilder = this.repository.createQueryBuilder().where('1=1');

    if (where.name) {
      sqlBuilder.andWhere('name like "%":name"%"', { name: where.name });
    }

    if (where.vip) {
      sqlBuilder.andWhere('vip=:vip', where);
    }

    sqlBuilder.skip((page - 1) * pageSize);
    sqlBuilder.take(pageSize);
    // const sql = sqlBuilder.getQuery()
    // console.log("TCL: UserService -> sql", sql)

    const list = await sqlBuilder.getMany();
    const total = await sqlBuilder.getCount();

    return {
      page,
      total,
      list,
    };
  }
}
