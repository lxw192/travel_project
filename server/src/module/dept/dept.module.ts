import { DeptDto } from './dept.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Global } from '@nestjs/common';
import { DeptService } from './dept.service';
import { DeptController } from './dept.controller';
import { Dept } from './dept.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Dept])],
  providers: [DeptService, DeptDto],
  controllers: [DeptController],
  exports: [DeptService],
})
export class DeptModule {}
