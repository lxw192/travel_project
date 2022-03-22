import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { OperateLog } from './operate-log.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OperateLogService extends BaseService<OperateLog> {
  constructor(
    @InjectRepository(OperateLog)
    protected readonly repository: Repository<OperateLog>,
  ) {
    super();
  }
}
