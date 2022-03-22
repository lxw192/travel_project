import { Injectable } from '@nestjs/common';
import * as RedisClient from 'ioredis';

@Injectable()
export class RedisService {
  constructor() {
    this.client = new RedisClient(RedisService.options);
  }
  static options: RedisClient.RedisOptions = {};
  client: RedisClient.Redis;
  static setOptions(options: RedisClient.RedisOptions) {
    RedisService.options = options;
  }
}
