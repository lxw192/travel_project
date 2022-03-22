import { Module } from '@nestjs/common';
import { ComponentStatService } from './component-stat.service';
import { ComponentStatController } from './component-stat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentStatEntity } from './component-stat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ComponentStatEntity]),
  ],
  providers: [ComponentStatService],
  controllers: [ComponentStatController]
})
export class ComponentStatModule {}
