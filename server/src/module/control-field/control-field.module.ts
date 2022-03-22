import { Module } from '@nestjs/common';
import { ControlFieldService } from './control-field.service';
import { ControlFieldController } from './control-field.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlFieldEntity } from './control-field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ControlFieldEntity])],
  providers: [ControlFieldService],
  controllers: [ControlFieldController],
})
export class ControlFieldModule {}
