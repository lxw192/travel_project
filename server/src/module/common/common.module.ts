import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'common',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 10001,
        },
      },
    ]),
  ],
  providers: [CommonService],
  controllers: [CommonController],
})
export class CommonModule {}
