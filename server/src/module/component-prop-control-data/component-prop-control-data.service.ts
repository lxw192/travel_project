import { Repository } from 'typeorm';
import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentPropControlDataEntity } from './component-prop-control-data.entity';

@Injectable()
export class ComponentPropControlDataService extends BaseService<ComponentPropControlDataEntity> {
  constructor(
    @InjectRepository(ComponentPropControlDataEntity)
    public readonly repository: Repository<ComponentPropControlDataEntity>,
  ) {
    super();
  }
}
