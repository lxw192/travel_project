import { Repository } from 'typeorm';
import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ControlFieldEntity } from './control-field.entity';

@Injectable()
export class ControlFieldService extends BaseService<ControlFieldEntity> {
  constructor(
    @InjectRepository(ControlFieldEntity)
    protected readonly repository: Repository<ControlFieldEntity>,
  ) {
    super();
  }
}
