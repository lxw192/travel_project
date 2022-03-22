import { Repository } from 'typeorm';
import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataTypeEntity } from './data-type.entity';

@Injectable()
export class DataTypeService extends BaseService<DataTypeEntity> {
  constructor(
    @InjectRepository(DataTypeEntity)
    protected readonly repository: Repository<DataTypeEntity>,
  ) {
    super();
  }
}
