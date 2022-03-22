import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisOptions } from 'ioredis';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  static register(options: RedisOptions) {
    RedisService.setOptions(options);
    return RedisModule;
  }
}
