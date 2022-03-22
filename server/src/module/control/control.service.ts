import { Repository } from 'typeorm';
import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ControlEntity } from './control.entity';

@Injectable()
export class ControlService extends BaseService<ControlEntity> {
  constructor(
    @InjectRepository(ControlEntity)
    protected readonly repository: Repository<ControlEntity>,
  ) {
    super();
  }
}
