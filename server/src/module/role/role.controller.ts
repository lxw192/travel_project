import { RoleDto } from './role.dto';
import { Role } from './role.entity';
import { Controller } from '@nestjs/common';
import { BaseController } from '../../core/controller';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController extends BaseController<Role, RoleDto> {
  constructor(protected readonly service: RoleService) {
    super();
  }
}
