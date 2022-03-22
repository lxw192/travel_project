import { Repository } from 'typeorm';
import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from './group.entity';

@Injectable()
export class GroupService extends BaseService<GroupEntity> {
  constructor(
    @InjectRepository(GroupEntity)
    protected readonly repository: Repository<GroupEntity>,
  ) {
    super();
  }
}
