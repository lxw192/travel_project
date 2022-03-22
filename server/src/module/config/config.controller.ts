import { ConfigService } from './config.service';
import { ConfigDto } from './config.dto';
import { ConfigEntity } from './config.entity';
import { BaseController } from '../../core/controller';
import { Controller, Get, Post } from '@nestjs/common';
import { InterService } from '../inter/inter.service';
import { success, PageData } from '../../common/Http';
import { ReqData } from '../../decorator/req-data.decorator';
import { writeFileSync } from 'fs';

@Controller('config')
export class ConfigController extends BaseController<ConfigEntity, ConfigDto> {
  constructor(
    protected readonly service: ConfigService,
    protected readonly interService: InterService,
  ) {
    super();
  }
  @Get('/page')
  @success()
  async page(@ReqData() reqData): Promise<PageData<ConfigEntity>> {
    const { pageSize, page, ts, ...where } = reqData;
    const data = await this.service.search(pageSize, page, ts, where);
    for (const item of data.list) {
      const inter = await this.interService.info({ id: item.interId });

      item['inter'] = inter;
    }

    return data;
  }
  @Post('/sync/:id')
  @success()
  async syncToProject(@ReqData() reqData) {
    console.log(
      '🚀 ~ file: config.controller.ts ~ line 37 ~ ConfigController ~ syncToProject ~ reqData',
      reqData,
    );
    const { id } = reqData;
    const info = await this.service.info({ id });
    const inter = await this.interService.info({ id: info.interId });
    const basePath = 'D:/csx/csx-b2b-front-datacenter/src/config';
    const name = inter.url
      .replace(/\//g, '@@')
      .replace(/\?interType=/, '$$$interType='); // $$正则约定输出一个$

    writeFileSync(
      `${basePath}/json/${name}.json`,
      JSON.stringify(info.configData, undefined, 2),
    );
  }
}
