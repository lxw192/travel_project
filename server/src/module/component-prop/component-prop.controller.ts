import { Controller } from '@nestjs/common';
import { BaseController } from '../../core/controller';
import { ComponentPropEntity } from './component-prop.entity';
import { ComponentPropDto } from './component-prop.dto';
import { ComponentPropService } from './component-prop.service';

@Controller('component-prop')
export class ComponentPropController extends BaseController<
  ComponentPropEntity,
  ComponentPropDto
> {
  constructor(protected readonly service: ComponentPropService) {
    super();
  }
}
