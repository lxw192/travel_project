import { PageData } from '../common/Http';
import { ObjectLiteral } from './../interface/common';
import { Repository, DeepPartial, FindConditions, UpdateResult } from 'typeorm';
import * as dayjs from 'dayjs';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { extendPropConvert } from '../utils/extendProp';

export class BaseService<Entity> {
  protected repository: Repository<Entity>;

  async page(...args): Promise<PageData<Entity>> {
    return this.search(...args);
    // const list = await this.repository.find(where);
    // const total = await this.count(where);

    // const sqlBuilder = this.repository.createQueryBuilder().where('1=1');

    // Object.keys(where).forEach(key => {
    //   sqlBuilder.andWhere(`${key}=:${key}`, where);
    // });

    // sqlBuilder.skip((page - 1) * pageSize);
    // sqlBuilder.take(pageSize);
    // // const sql = sqlBuilder.getQuery()
    // // console.log("TCL: UserService -> sql", sql)

    // const list = await sqlBuilder.getMany();
    // const total = await sqlBuilder.getCount();

    // return {
    //   page,
    //   total: total,
    //   list,
    // };
  }
  async search(
    pageSize: number = 20,
    page: number = 1,
    ts: number = dayjs().valueOf(),
    where: ObjectLiteral = {},
    columns?: string[],
  ): Promise<PageData<Entity>> {
    // const list = await this.repository.find(where);
    // const total = await this.count(where);

    console.log('TCL: where', where);
    const noEmptyWhere = Object.keys(where).reduce((prev, key) => {
      if (where[key]) {
        prev[key] = where[key];
      }
      return prev;
    }, {});

    const sqlBuilder = this.repository.createQueryBuilder().where('1=1');

    Object.keys(noEmptyWhere).forEach((key) => {
      if (key.indexOf('&') === 0) {
        const originKey = key.substring(1);
        const val = noEmptyWhere[key];
        sqlBuilder.leftJoinAndSelect(
          `${originKey}`,
          'b',
          `${val[0]} = b.${val[1]}`,
        );
      } else if (key.indexOf('%') === 0) {
        const originKey = key.substring(1);
        sqlBuilder.andWhere(`${originKey} like "%":${originKey}"%"`, {
          [originKey]: noEmptyWhere[key],
        });
      } else if (key.indexOf('^') === 0) {
        const originKey = key.substring(1);
        sqlBuilder.orderBy(originKey, noEmptyWhere[key].toUpperCase());
      } else if (key.indexOf('~') === 0) {
        const originKey = key.substring(1);
        sqlBuilder.andWhere(`\`${originKey}\` between :start and :end`, {
          ...noEmptyWhere[key],
        });
      } else if (key.indexOf('|') === 0) {
        const originKey = key.substring(1);
        sqlBuilder.orWhere(`\`${originKey}\`=:${originKey}`, {
          [originKey]: noEmptyWhere[key],
        });
      } else if (
        key.indexOf('<') === 0 ||
        key.indexOf('>') === 0 ||
        key.indexOf('!') === 0
      ) {
        const isEqual = key.indexOf('=') === 1;
        const char = key.substr(0, isEqual ? 2 : 1);
        const originKey = key.substring(isEqual ? 2 : 1);
        sqlBuilder.andWhere(`\`${originKey}\` ${char} :${originKey}`, {
          [originKey]: noEmptyWhere[key],
        });
      } else {
        sqlBuilder.andWhere(`\`${key}\`=:${key}`, noEmptyWhere);
      }
    });

    sqlBuilder.skip((page - 1) * pageSize);
    sqlBuilder.take(pageSize);
    console.log('TCL: UserService -> sql', sqlBuilder.getSql());

    const list = await sqlBuilder.getMany();
    const total = await sqlBuilder.getCount();

    list.forEach(item => {
      item && extendPropConvert(item);
    })

    return {
      page,
      total: total,
      list,
    };
  }

  async list(where?: ObjectLiteral, columns?: string[]): Promise<Entity[]> {
    const list = await this.repository.find(where);
    list.forEach(item => {
      item && extendPropConvert(item);
    })
    return list;
  }
  async info(where: ObjectLiteral, columns?: string[]): Promise<Entity> {
    const info = await this.repository.findOne(where);
    info && extendPropConvert(info);
    return info;
  }

  async save(
    data: DeepPartial<Entity>,
    where?: ObjectLiteral,
  ): Promise<Entity> {
    const time = dayjs().toDate();
    data = {
      ...data,
      updatedAt: time,
      ...(where ? { createdAt: time } : {}),
    };
    console.log('TCL: MyService<Entity> -> data', data);
    return this.repository.save(data, where);
  }

  async create(data: QueryDeepPartialEntity<Entity>): Promise<number | string> {
    const time = dayjs().toDate();
    data = {
      ...data,
      updatedAt: time,
      createdAt: time,
    };
    console.log('data', data);
    try{
      const result = await this.repository.insert(data);
      console.log('result', result);
      return result.raw.insertId;
    } catch (err) {
      throw('数据库存储更新错误')
    }
  }

  async update(
    data: QueryDeepPartialEntity<Entity>,
    where: FindConditions<Entity>,
  ): Promise<UpdateResult> {
    const entity = {
      // ...entity,
      ...data,
      updatedAt: dayjs().toDate(),
    };
    const result = await this.repository.update(where, entity);
    // console.log("TCL: MyService<Entity> -> result", result)
    return result;
  }

  async delete(where: FindConditions<Entity>): Promise<Entity | Entity[]> {
    const list = await this.list(where);
    return this.repository.remove(list);
  }
  async count(where: ObjectLiteral = {}): Promise<number> {
    // return this.repository.count(where);
    const noEmptyWhere = Object.keys(where).reduce((prev, key) => {
      if (where[key]) {
        prev[key] = where[key];
      }
      return prev;
    }, {});
    console.log('TCL: noEmptyWhere', noEmptyWhere);

    const sqlBuilder = this.repository.createQueryBuilder().where('1=1');

    Object.keys(noEmptyWhere).forEach((key) => {
      if (key.indexOf('%') === 0) {
        const originKey = key.substring(1);
        sqlBuilder.andWhere(`${originKey} like "%":${originKey}"%"`, {
          [originKey]: noEmptyWhere[key],
        });
      } else if (key.indexOf('^') === 0) {
        const originKey = key.substring(1);
        sqlBuilder.orderBy(originKey, noEmptyWhere[key].toUpperCase());
      } else if (key.indexOf('~') === 0) {
        const originKey = key.substring(1);
        sqlBuilder.andWhere(`${originKey} between :start and :end`, {
          ...noEmptyWhere[key],
        });
      } else if (key.indexOf('|') === 0) {
        const originKey = key.substring(1);
        sqlBuilder.orWhere(`${originKey}=:${originKey}`, {
          [originKey]: noEmptyWhere[key],
        });
      } else if (
        key.indexOf('<') === 0 ||
        key.indexOf('>') === 0 ||
        key.indexOf('!') === 0
      ) {
        const isEqual = key.indexOf('=') === 1;
        const char = key.substr(0, isEqual ? 2 : 1);
        const originKey = key.substring(isEqual ? 2 : 1);
        sqlBuilder.andWhere(`${originKey} ${char} :${originKey}`, {
          [originKey]: noEmptyWhere[key],
        });
      } else {
        sqlBuilder.andWhere(`${key}=:${key}`, noEmptyWhere);
      }
    });
    // const sql = sqlBuilder.getQuery();
    // console.log('TCL: UserService -> sql', sql);

    const total = await sqlBuilder.getCount();
    return total;
  }
}
