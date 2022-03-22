import { DemandUser } from './demand-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DemandUserService } from './demand-user.service';
import { DemandUserController } from './demand-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DemandUser])],
  providers: [DemandUserService],
  controllers: [DemandUserController],
  exports: [DemandUserService],
})
export class DemandUserModule {}
