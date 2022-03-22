import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { Module } from './module.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ModuleService extends BaseService<Module> {
  constructor(
    @InjectRepository(Module)
    protected readonly repository: Repository<Module>,
  ) {
    super();
  }
}
