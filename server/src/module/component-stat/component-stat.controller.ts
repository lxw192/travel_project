import { Controller, Get, Post } from '@nestjs/common';
import { BaseController } from '../../core/controller';
import { ComponentStatEntity } from './component-stat.entity';
import { ComponentStatDto } from './component-stat.dto';
import { ComponentStatService } from './component-stat.service';
import { writeFileSync } from 'fs';
import { success } from '../../common/Http';
import { ReqData } from '../../decorator/req-data.decorator';

@Controller('component-stat')
export class ComponentStatController extends BaseController<
  ComponentStatEntity,
  ComponentStatDto
>{
  constructor(
    protected readonly service: ComponentStatService,
  ) {
    super();
  }

  @Post('/report')
  @success()
  async syncToProject(@ReqData() reqData) {
    console.log("🚀 ~ file: component-stat.controller.ts ~ line 24 ~ syncToProject ~ reqData", reqData)

    const { projectName, statUrl, componentList } = reqData;
    for(const item of componentList) {
      const { componentName, baseUrl, pathname } = item;
      const info = await this.service.info({
        projectName,
        baseUrl,
        url: pathname,
        componentName,
      });

      if(info) {
        await this.service.update({
          count: info.count + 1,
        }, { id: info.id});
      } else {
        await this.service.create({
          projectName,
          url: pathname,
          baseUrl,
          componentName,
          count: 1,
        });
      }
    }

    return {};
  }

}
