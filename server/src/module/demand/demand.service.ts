import { Repository } from 'typeorm';
import { Demand } from './demand.entity';
import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DemandService extends BaseService<Demand> {
  constructor(
    @InjectRepository(Demand)
    protected readonly repository: Repository<Demand>,
  ) {
    super();
  }
}
