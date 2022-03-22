import { Repository } from 'typeorm';
import { InterEntity } from './inter.entity';
import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InterService extends BaseService<InterEntity> {
  constructor(
    @InjectRepository(InterEntity)
    public readonly repository: Repository<InterEntity>,
  ) {
    super();
  }
}
