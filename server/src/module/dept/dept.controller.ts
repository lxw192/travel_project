import { reqDataValid } from '../../utils/reqDataValid';
import { ReqData } from './../../decorator/req-data.decorator';
import { DeptDto } from './dept.dto';
import { DeptService } from './dept.service';
import { BaseController } from '../../core/controller';
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { Dept } from './dept.entity';
import { ValidationPipe } from '../../pipe/ValidationPipe';

@Controller('dept')
export class DeptController extends BaseController<Dept, DeptDto> {
  constructor(
    protected readonly service: DeptService,
    protected readonly dto: DeptDto,
  ) {
    super();
  }

  @Post('test2')
  @UsePipes(ValidationPipe)
  async create(@ReqData() reqData) {
    await reqDataValid(this.dto.create, reqData);
    return {};
  }
}
