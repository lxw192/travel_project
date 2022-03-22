import { Module } from '@nestjs/common';
import { FeatureToggleService } from './feature-toggle.service';
import { FeatureToggleController } from './feature-toggle.controller';
import { FeatureToggle } from './feature-toggle.entity';
import { InterModule } from '../inter/inter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureToggleDto } from './feature-toggle.dto';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureToggle]), InterModule],
  controllers: [FeatureToggleController],
  providers: [FeatureToggleService, FeatureToggleDto]
})
export class FeatureToggleModule {}
