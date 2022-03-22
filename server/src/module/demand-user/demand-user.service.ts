import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { DemandUser } from './demand-user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DemandUserService extends BaseService<DemandUser> {
  constructor(
    @InjectRepository(DemandUser)
    protected readonly repository: Repository<DemandUser>,
  ) {
    super();
  }
}
