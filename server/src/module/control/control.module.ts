import { Module } from '@nestjs/common';
import { ControlService } from './control.service';
import { ControlController } from './control.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlEntity } from './control.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ControlEntity])],
  providers: [ControlService],
  controllers: [ControlController],
})
export class ControlModule {}
