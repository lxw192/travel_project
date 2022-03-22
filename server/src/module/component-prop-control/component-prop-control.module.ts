import { Module } from '@nestjs/common';
import { ComponentPropControlService } from './component-prop-control.service';
import { ComponentPropControlController } from './component-prop-control.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentPropControlEntity } from './component-prop-control.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentPropControlEntity])],
  providers: [ComponentPropControlService],
  controllers: [ComponentPropControlController],
  exports: [ComponentPropControlService],
})
export class ComponentPropControlModule {}
