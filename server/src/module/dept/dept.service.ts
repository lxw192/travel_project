import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { Dept } from './dept.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeptService extends BaseService<Dept> {
  constructor(
    @InjectRepository(Dept)
    protected readonly repository: Repository<Dept>,
  ) {
    super();
  }
}
