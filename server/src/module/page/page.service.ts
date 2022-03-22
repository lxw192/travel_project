import { Repository } from 'typeorm';
import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEntity } from './page.entity';


@Injectable()
export class PageService extends BaseService<PageEntity>{
  constructor(
    @InjectRepository(PageEntity)
    protected readonly repository: Repository<PageEntity>,
  ) {
    super();
  }
}
