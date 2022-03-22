import { ReqData } from './../../decorator/req-data.decorator';
import { InterService } from './inter.service';
import { InterDto } from './inter.dto';
import { InterEntity } from './inter.entity';
import { BaseController } from '../../core/controller';
import { Controller, Get, Param } from '@nestjs/common';
import { Http, success } from '../../common/Http';

@Controller('inter')
export class InterController extends BaseController<InterEntity, InterDto> {
  constructor(protected readonly service: InterService) {
    super();
  }

  @Get('/mock-api')
  async getMockApi(@ReqData() reqData) {
    const { url } = reqData;
    const entity = await this.service.repository.findOne({ url });
    if (entity) {
      return entity.resData;
    } else {
      return Http.fail(1100001, '无此接口', {url})
    }
  }
}
