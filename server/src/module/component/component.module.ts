import { ComponentPropModule } from './../component-prop/component-prop.module';
import { Module } from '@nestjs/common';
import { ComponentService } from './component.service';
import { ComponentController } from './component.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentEntity } from './component.entity';
import { ComponentPropControlDataModule } from '../component-prop-control-data/component-prop-control-data.module';
import { ComponentPropControlModule } from '../component-prop-control/component-prop-control.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ComponentEntity]),
    ComponentPropModule,
    ComponentPropControlModule,
    ComponentPropControlDataModule,
  ],
  providers: [ComponentService],
  controllers: [ComponentController],
})
export class ComponentModule {}
