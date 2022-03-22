import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../core/service';
import { Repository } from 'typeorm';
import { ConfigTypeEntity } from './config-type.entity';

@Injectable()
export class ConfigTypeService extends BaseService<ConfigTypeEntity> {
  constructor(
    @InjectRepository(ConfigTypeEntity)
    protected readonly repository: Repository<ConfigTypeEntity>,
  ) {
    super();
  }
}
