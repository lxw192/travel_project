import { Controller } from '@nestjs/common';
import { BaseController } from '../../core/controller';
import { DataTypeEntity } from './data-type.entity';
import { DataTypeDto } from './data-type.dto';
import { DataTypeService } from './data-type.service';

@Controller('data-type')
export class DataTypeController extends BaseController<
  DataTypeEntity,
  DataTypeDto
> {
  constructor(protected readonly service: DataTypeService) {
    super();
  }
}
