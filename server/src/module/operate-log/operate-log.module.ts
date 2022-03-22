import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Global } from '@nestjs/common';
import { OperateLogService } from './operate-log.service';
import { OperateLogController } from './operate-log.controller';
import { OperateLog } from './operate-log.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([OperateLog])],
  providers: [OperateLogService],
  controllers: [OperateLogController],
  exports: [OperateLogService],
})
export class OperateLogModule {}
