import { Repository } from 'typeorm';
import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentEntity } from './component.entity';

@Injectable()
export class ComponentService extends BaseService<ComponentEntity> {
  constructor(
    @InjectRepository(ComponentEntity)
    public readonly repository: Repository<ComponentEntity>,
  ) {
    super();
  }
}
