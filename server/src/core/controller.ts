import { ReqData } from '../decorator/req-data.decorator';
import { FindConditions, UpdateResult, DeepPartial } from 'typeorm';
import { Http, success, PageData } from '../common/Http';
import { BaseService } from './service';
import { ObjectLiteral } from '../interface/common';
import {
  Get,
  Post,
  Request,
  Param,
  Put,
  Delete,
  Req,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CommonDto } from './commonDto';
import { reqDataValid } from '../utils/reqDataValid';
import { AuthGuard } from '@nestjs/passport';

export class BaseController<Entity, Dto extends CommonDto> {
  protected readonly service: BaseService<Entity>;
  protected readonly dto: Dto;
  primaryKey = 'id';
  userKey = 'userId';
  isRelationCurrUser = false;

  @Get('/page')
  @success()
  async _page(@ReqData() reqData): Promise<PageData<Entity>> {
    const { pageSize, page, ts, ...where } = reqData;
    this.dto && this.dto.page && (await reqDataValid(this.dto.page, reqData));
    const noEmptyWhere = Object.keys(where).reduce((prev, key) => {
      if (where[key] !== '') {
        prev[key] = where[key];
      }
      return prev;
    }, {});
    return this.service.page(pageSize, page, ts, noEmptyWhere);
  }

  @Get('/list')
  @success()
  async _list(@ReqData() reqData): Promise<Entity[]> {
    this.dto && this.dto.list && (await reqDataValid(this.dto.list, reqData));
    return this.service.list();
  }
  @Get('/info')
  @success()
  async _info(@ReqData() reqData): Promise<Entity> {
    // const reqData = Http.getReqDataByData(req);
    this.dto && this.dto.info && (await reqDataValid(this.dto.info, reqData));
    const primaryKey = reqData[this.primaryKey];
    if (!primaryKey) {
      Http.failThrow(2001, `${this.primaryKey} is required`);
    }
    return this.service.info({ [this.primaryKey]: primaryKey });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/save')
  @success()
  async _save(@ReqData() reqData): Promise<Entity> {
    // const reqData = Http.getReqDataByData(req) as Entity;
    this.dto && this.dto.save && (await reqDataValid(this.dto.save, reqData));
    const primaryKey = reqData[this.primaryKey];

    if (primaryKey) {
      const where = { [this.primaryKey]: primaryKey } as FindConditions<Entity>;
      await this.service.update(reqData, where);
      return this.service.info(where);
    } else {
      const id = await this.service.create(reqData);
      return this.service.info({ [this.primaryKey]: id });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  @success()
  async _create(@ReqData() reqData): Promise<object> {
    // const reqData = Http.getReqDataByData(req) as Entity;
    this.dto &&
      this.dto.create &&
      (await reqDataValid(this.dto.create, reqData));
    const id = await this.service.create(reqData);
    return { id };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/update')
  @success()
  async _update(@ReqData() reqData): Promise<Entity> {
    // const reqData = Http.getReqDataByData(req) as Entity;
    this.dto &&
      this.dto.update &&
      (await reqDataValid(this.dto.update, reqData));
    const primaryKey = reqData[this.primaryKey];

    if (!primaryKey) {
      Http.failThrow(2001, `${this.primaryKey} is required`);
    }
    const where = { [this.primaryKey]: primaryKey } as FindConditions<Entity>;

    await this.service.update(reqData, where);
    return;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/status')
  @success()
  async _status(@ReqData() reqData): Promise<Entity> {
    //todo  默认只有status
    // const reqData = Http.getReqDataByData(req) as Entity;
    this.dto &&
      this.dto.status &&
      (await reqDataValid(this.dto.status, reqData));
    console.log('TCL: BaseController<Entity> -> reqData', reqData);
    const primaryKey = reqData[this.primaryKey];

    if (!primaryKey) {
      Http.failThrow(2001, `${this.primaryKey} is required`);
    }
    // const statusData: Entity = { status: reqData.status };
    const where = { [this.primaryKey]: primaryKey } as FindConditions<Entity>;
    await this.service.update(reqData, where);
    return this.service.info(where);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/delete')
  @success()
  async _delete(@ReqData() reqData) {
    //todo 只有id就可以了
    // const reqData = Http.getReqDataByData(req) as FindConditions<Entity>;
    this.dto &&
      this.dto.delete &&
      (await reqDataValid(this.dto.delete, reqData));
    const primaryKey = reqData[this.primaryKey];

    if (!primaryKey) {
      Http.failThrow(2001, `${this.primaryKey} is required`);
    }

    const ids = primaryKey.split(',');
    for (const id of ids) {
      const data = { [this.primaryKey]: id } as FindConditions<Entity>;
      this.service.delete(data);
    }
  }

  @Get('/count')
  @success()
  async _count(@ReqData() reqData): Promise<object> {
    this.dto && this.dto.count && (await reqDataValid(this.dto.count, reqData));
    const count = await this.service.count();
    return { total: count };
  }

  //restful
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async _add(@ReqData() reqData): Promise<object> {
    this.dto &&
      this.dto.create &&
      (await reqDataValid(this.dto.create, reqData));
    return this._create(reqData);
  }

  @Get()
  async _findAll(@ReqData() reqData): Promise<object> {
    this.dto && this.dto.page && (await reqDataValid(this.dto.page, reqData));
    return this._page(reqData);
  }

  @Get(':id')
  @success()
  async _findOne(@Param('id') id, @ReqData() reqData) {
    reqData.id = id;
    this.dto && this.dto.info && (await reqDataValid(this.dto.info, reqData));
    return this.service.info({ [this.primaryKey]: id });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @success()
  async _updateRest(@Param('id') id, @ReqData() reqData) {
    reqData.id = id;
    // console.log("BaseController<Entity, -> _updateRest -> this.dto.update", this.dto.update)
    this.dto &&
      this.dto.update &&
      (await reqDataValid(this.dto.update, reqData));
    const where = { [this.primaryKey]: id } as FindConditions<Entity>;
    return this.service.update(reqData, where);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @success()
  async _patchRest(@Param('id') id, @ReqData() reqData) {
    reqData.id = id;
    this.dto && this.dto.patch && (await reqDataValid(this.dto.patch, reqData));
    const where = { [this.primaryKey]: id } as FindConditions<Entity>;

    return this.service.update(reqData, where);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @success()
  async _deleteRest(@Param('id') id, @ReqData() reqData) {
    reqData.id = id;
    this.dto &&
      this.dto.delete &&
      (await reqDataValid(this.dto.delete, reqData));
    const ids = id.split(',');
    for (const id of ids) {
      const data = { [this.primaryKey]: id } as FindConditions<Entity>;
      await this.service.delete(data);
    }
  }

  async pageData(
    pageSize: number,
    page: number,
    ts: number,
    where: ObjectLiteral,
    columns: string[],
  ): Promise<PageData<Entity>> {
    return this.service.page(pageSize, page, ts, where, columns);
  }

  async listData(where: ObjectLiteral, columns?: string[]): Promise<Entity[]> {
    return this.service.list(where, columns);
  }
  async infoData(where: ObjectLiteral, columns?: string[]): Promise<Entity> {
    return this.service.info(where, columns);
  }

  async saveData(
    data: DeepPartial<Entity>,
    where?: ObjectLiteral,
  ): Promise<Entity> {
    return this.service.save(data, where);
  }

  async createData(
    data: QueryDeepPartialEntity<Entity>,
  ): Promise<number | string> {
    return this.service.create(data);
  }

  async updateData(
    data: QueryDeepPartialEntity<Entity>,
    where: FindConditions<Entity>,
  ): Promise<UpdateResult> {
    return this.service.update(data, where);
  }

  async deleteData(where: FindConditions<Entity>): Promise<Entity | Entity[]> {
    return this.service.delete(where);
  }
  async countData(where: ObjectLiteral): Promise<number> {
    return this.service.count(where);
  }
}
