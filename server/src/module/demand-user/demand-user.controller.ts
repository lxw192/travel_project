import { DemandUserDto } from './demand-user.dto';
import { DemandUserService } from './demand-user.service';
import { BaseController } from '../../core/controller';
import { Controller } from '@nestjs/common';
import { DemandUser } from './demand-user.entity';

@Controller('demand-user')
export class DemandUserController extends BaseController<
  DemandUser,
  DemandUserDto
> {
  constructor(protected readonly service: DemandUserService) {
    super();
  }
}
