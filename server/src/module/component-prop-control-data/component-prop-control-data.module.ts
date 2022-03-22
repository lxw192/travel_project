import { Module } from '@nestjs/common';
import { ComponentPropControlDataService } from './component-prop-control-data.service';
import { ComponentPropControlDataController } from './component-prop-control-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentPropControlDataEntity } from './component-prop-control-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentPropControlDataEntity])],
  providers: [ComponentPropControlDataService],
  controllers: [ComponentPropControlDataController],
  exports: [ComponentPropControlDataService],
})
export class ComponentPropControlDataModule {}
