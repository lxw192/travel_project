import { Controller, Post, UseGuards } from '@nestjs/common';
import { FeatureToggleService } from './feature-toggle.service';
import { BaseController } from '../../core/controller';
import { FeatureToggleDto } from './feature-toggle.dto';
import { FeatureToggle } from './feature-toggle.entity';
import { Http, success } from '../../common/Http';
import { AuthGuard } from '@nestjs/passport';
import { ReqData } from '../../decorator/req-data.decorator';
import { reqDataValid } from '../../utils/reqDataValid';

@Controller('feature-toggle')
export class FeatureToggleController extends BaseController<FeatureToggle, FeatureToggleDto> {
  constructor(
    protected readonly service: FeatureToggleService,
    protected readonly dto: FeatureToggleDto,
    // private readonly featureToggleService: FeatureToggleService
  ) {
    super();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  @success()
  async _create(@ReqData() reqData): Promise<object> {
    this.dto &&
      this.dto.create &&
      (await reqDataValid(this.dto.create, reqData));

    const info = await this.service.info({
      moduleKey: reqData.moduleKey,
      viewUrl: reqData.viewUrl
    })
    if (info) {
      Http.failThrow(2020, `数据已经存在`);
    }

    const id = await this.service.create(reqData);
    return { id };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('report')
  @success()
  async report (@ReqData() reqData): Promise<object>{
    this.dto &&
      this.dto.create &&
      (await reqDataValid(this.dto.create, reqData));

    const info = await this.service.info({
      moduleKey: reqData.moduleKey,
      viewUrl: reqData.viewUrl
    })
    if (info) {
      Http.failThrow(2020, `数据已经存在`);
    }
    return reqData;
  }
}
