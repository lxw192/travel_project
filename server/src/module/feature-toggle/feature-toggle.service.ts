import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../core/service';
import { FeatureToggleDto } from './feature-toggle.dto';
import { FeatureToggle } from './feature-toggle.entity';

@Injectable()
export class FeatureToggleService extends BaseService<FeatureToggle> {
  constructor(
    @InjectRepository(FeatureToggle)
    protected readonly repository: Repository<FeatureToggle>,
  ) {
    super();
  }
}
