import { Controller } from '@nestjs/common';
import { BaseController } from '../../core/controller';
import { ComponentPropControlDataEntity } from './component-prop-control-data.entity';
import { ComponentPropControlDataDto } from './component-prop-control-data.dto';
import { ComponentPropControlDataService } from './component-prop-control-data.service';

@Controller('component-prop-control-data')
export class ComponentPropControlDataController extends BaseController<
  ComponentPropControlDataEntity,
  ComponentPropControlDataDto
> {
  constructor(protected readonly service: ComponentPropControlDataService) {
    super();
  }
}
