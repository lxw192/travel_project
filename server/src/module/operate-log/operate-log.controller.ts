import { OperateLogDto } from './operate-log.dto';
import { OperateLogService } from './operate-log.service';
import { BaseController } from '../../core/controller';
import { Controller } from '@nestjs/common';
import { OperateLog } from './operate-log.entity';

@Controller('operate-log')
export class OperateLogController extends BaseController<
  OperateLog,
  OperateLogDto
> {
  constructor(protected readonly service: OperateLogService) {
    super();
  }
}
