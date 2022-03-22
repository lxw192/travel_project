import { Admin } from './admin.entity';
import { BaseService } from './../../core/service';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService extends BaseService<Admin> {
  @InjectRepository(Admin)
  protected repository: Repository<Admin>;
}
