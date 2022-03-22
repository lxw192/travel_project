import { Module } from '@nestjs/common';
import { DataTypeService } from './data-type.service';
import { DataTypeController } from './data-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataTypeEntity } from './data-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataTypeEntity])],
  providers: [DataTypeService],
  controllers: [DataTypeController],
})
export class DataTypeModule {}
