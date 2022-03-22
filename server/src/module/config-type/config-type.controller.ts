import { Controller } from '@nestjs/common';
import { BaseController } from '../../core/controller';
import { ConfigTypeDto } from './config-type.dto';
import { ConfigTypeEntity } from './config-type.entity';
import { ConfigTypeService } from './config-type.service';

@Controller('config-type')
export class ConfigTypeController extends BaseController<
  ConfigTypeEntity,
  ConfigTypeDto
> {
  constructor(protected readonly service: ConfigTypeService) {
    super();
  }
}
