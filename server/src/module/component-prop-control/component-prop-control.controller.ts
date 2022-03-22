import { Controller } from '@nestjs/common';
import { BaseController } from '../../core/controller';
import { ComponentPropControlEntity } from './component-prop-control.entity';
import { ComponentPropControlDto } from './component-prop-control.dto';
import { ComponentPropControlService } from './component-prop-control.service';

@Controller('component-prop-control')
export class ComponentPropControlController extends BaseController<
  ComponentPropControlEntity,
  ComponentPropControlDto
> {
  constructor(protected readonly service: ComponentPropControlService) {
    super();
  }
}
