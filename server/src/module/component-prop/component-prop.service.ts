import { Repository } from 'typeorm';
import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentPropEntity } from './component-prop.entity';

@Injectable()
export class ComponentPropService extends BaseService<ComponentPropEntity> {
  constructor(
    @InjectRepository(ComponentPropEntity)
    public readonly repository: Repository<ComponentPropEntity>,
  ) {
    super();
  }
}
