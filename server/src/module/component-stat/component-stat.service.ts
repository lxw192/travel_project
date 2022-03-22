import { Repository } from 'typeorm';
import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentStatEntity } from './component-stat.entity';


@Injectable()
export class ComponentStatService extends BaseService<ComponentStatEntity>{
  constructor(
    @InjectRepository(ComponentStatEntity)
    protected readonly repository: Repository<ComponentStatEntity>,
  ) {
    super();
  }
}
