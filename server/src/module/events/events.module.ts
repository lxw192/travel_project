import { EventsGateway } from './events.gateway';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
