import { Controller } from '@nestjs/common';
import { BaseController } from '../../core/controller';
import { GroupEntity } from './group.entity';
import { GroupDto } from './group.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController extends BaseController<GroupEntity, GroupDto> {
  constructor(protected readonly service: GroupService) {
    super();
  }
}
