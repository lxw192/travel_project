import { Controller } from '@nestjs/common';
import { BaseController } from '../../core/controller';
import { ControlEntity } from './control.entity';
import { ControlDto } from './control.dto';
import { ControlService } from './control.service';

@Controller('control')
export class ControlController extends BaseController<
  ControlEntity,
  ControlDto
> {
  constructor(protected readonly service: ControlService) {
    super();
  }
}
