import { InterModule } from './../inter/inter.module';
import { ConfigEntity } from './config.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigEntity]), InterModule],
  providers: [ConfigService],
  controllers: [ConfigController],
})
export class ConfigModule {}
