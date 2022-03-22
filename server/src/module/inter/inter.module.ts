import { InterEntity } from './inter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InterService } from './inter.service';
import { InterController } from './inter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InterEntity])],
  providers: [InterService],
  controllers: [InterController],
  exports: [InterService],
})
export class InterModule {}
