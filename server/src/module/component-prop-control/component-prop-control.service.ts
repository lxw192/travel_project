import { Repository } from 'typeorm';
import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentPropControlEntity } from './component-prop-control.entity';

@Injectable()
export class ComponentPropControlService extends BaseService<ComponentPropControlEntity> {
  constructor(
    @InjectRepository(ComponentPropControlEntity)
    public readonly repository: Repository<ComponentPropControlEntity>,
  ) {
    super();
  }
}
