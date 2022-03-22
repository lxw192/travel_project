import { ConfigTypeEntity } from './config-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigTypeService } from './config-type.service';
import { ConfigTypeController } from './config-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigTypeEntity])],
  providers: [ConfigTypeService],
  controllers: [ConfigTypeController],
})
export class ConfigTypeModule {}
