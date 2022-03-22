import { Repository } from 'typeorm';
import { ConfigEntity } from './config.entity';
import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ConfigService extends BaseService<ConfigEntity> {
  constructor(
    @InjectRepository(ConfigEntity)
    protected readonly repository: Repository<ConfigEntity>,
  ) {
    super();
  }
}
