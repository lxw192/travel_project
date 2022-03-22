import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageEntity } from './page.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PageEntity]),
  ],
  providers: [PageService],
  controllers: [PageController]
})
export class PageModule {}
