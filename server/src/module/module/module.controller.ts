import { ModuleDto } from './module.dto';
import { ModuleService } from './module.service';
import { BaseController } from '../../core/controller';
import { Controller } from '@nestjs/common';
import { Module } from './module.entity';

@Controller('module')
export class ModuleController extends BaseController<Module, ModuleDto> {
  constructor(protected readonly service: ModuleService) {
    super();
  }
}
