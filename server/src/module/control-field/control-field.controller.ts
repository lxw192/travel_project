import { Controller } from '@nestjs/common';
import { BaseController } from '../../core/controller';
import { ControlFieldEntity } from './control-field.entity';
import { ControlFieldDto } from './control-field.dto';
import { ControlFieldService } from './control-field.service';

@Controller('control-field')
export class ControlFieldController extends BaseController<
  ControlFieldEntity,
  ControlFieldDto
> {
  constructor(protected readonly service: ControlFieldService) {
    super();
  }
}
