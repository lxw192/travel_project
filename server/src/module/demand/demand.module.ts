import { DemandDto } from './demand.dto';
import { ModuleModule } from './../module/module.module';
import { ProductModule } from './../product/product.module';
import { DemandUserModule } from './../demand-user/demand-user.module';
import { Demand } from './demand.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DemandController } from './demand.controller';
import { DemandService } from './demand.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Demand]),
    DemandUserModule,
    ProductModule,
    ModuleModule,
  ],
  controllers: [DemandController],
  providers: [DemandService, DemandDto],
})
export class DemandModule {}
