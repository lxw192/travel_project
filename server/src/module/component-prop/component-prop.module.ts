import { Module } from '@nestjs/common';
import { ComponentPropService } from './component-prop.service';
import { ComponentPropController } from './component-prop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentPropEntity } from './component-prop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentPropEntity])],
  providers: [ComponentPropService],
  controllers: [ComponentPropController],
  exports: [ComponentPropService],
})
export class ComponentPropModule {}
