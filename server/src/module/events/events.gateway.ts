import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { getConnectSocketKey, getOnlineSocketKey, getOnlineUserKey, getSocketFindUserKey, getUserFindSocketKey } from '../../utils/key';
import { genMsg, MsgData } from '../../utils/msgData';
import { RedisService } from '../redis/redis.service';

//https://blog.csdn.net/qq_27868061/article/details/79095694
//https://www.cnblogs.com/ajanuw/p/9734517.html
//https://github.com/nestjs/nest/blob/master/sample/02-gateways/src/app.module.ts

@WebSocketGateway(
  // 3000,
  {
    namespace: '/chat',
    transports: ['websocket'],
  },
)
export class EventsGateway {
  constructor(
    private readonly redisService: RedisService,
  ) {}
  @WebSocketServer()
  server: Server;

  // afterInit(){

  // }
  async handleConnection(socket: Socket, ...args: any[]) {
    console.log("🚀 ~ file: events.gateway.ts ~ line 35 ~ EventsGateway ~ handleConnection ~ socket", socket.id);
    const client = this.redisService.client;
    const socketId = socket.id;
    const connectSocketKey = getConnectSocketKey(socketId);
    await client.set(connectSocketKey, '', 'EX', 30);
  }

  async handleDisconnect(socket: Socket, ...args: any[]) {
    console.log("🚀 ~ file: events.gateway.ts ~ line 43 ~ EventsGateway ~ handleDisconnect ~ socket", socket.id);
    const client = this.redisService.client;
    const socketId = socket.id;
    const connectSocketKey = getConnectSocketKey(socketId);
    await client.del(connectSocketKey);
    const socketFindUserKey = getSocketFindUserKey();
    const userFindSocketKey = getUserFindSocketKey();
    // const userId = '1111';
    const userId = await client.hget(socketFindUserKey, socketId);
    if(userId) {
      const socketKey = getOnlineSocketKey(socketId);
      const userKey = getOnlineUserKey(userId);
      const isOnline = await client.exists(socketKey);
      if(isOnline) {
        await client.del(socketKey);
        await client.del(userKey);
        await client.hdel(socketFindUserKey, socketId);
        await client.hdel(userFindSocketKey, userId);
      }
    }

  }

  @SubscribeMessage('online')
  async onOnline(@ConnectedSocket() socket: Socket, @MessageBody() msgData: MsgData) {
    console.log("🚀 ~ file: events.gateway.ts ~ line 68 ~ EventsGateway ~ onOnline ~ msgData", msgData);
    console.log("🚀 ~ file: events.gateway.ts ~ line 68 ~ EventsGateway ~ onOnline ~ socket", socket.id);
    const {meta: { userId }} = msgData;
    const client = this.redisService.client;
    const socketId = socket.id;
    // const userId = '1111';
    const socketKey = getOnlineSocketKey(socketId);
    const userKey = getOnlineUserKey(userId);
    const socketFindUserKey = getSocketFindUserKey();
    const userFindSocketKey = getUserFindSocketKey();
    await client.set(socketKey, '', 'EX', 30);
    await client.set(userKey, '', 'EX', 30);
    await client.hset(socketFindUserKey, socketId, userId);
    await client.hset(userFindSocketKey, userId, socketId);
  }

  @SubscribeMessage('offline')
  async onOffline(@ConnectedSocket() socket: Socket, msgData: string) {
    console.log("🚀 ~ file: events.gateway.ts ~ line 86 ~ EventsGateway ~ onOffline ~ msgData", msgData);
    console.log("🚀 ~ file: events.gateway.ts ~ line 86 ~ EventsGateway ~ onOffline ~ socket", socket.id);
    const client = this.redisService.client;
    const socketId = socket.id;

    const socketFindUserKey = getSocketFindUserKey();
    const userFindSocketKey = getUserFindSocketKey();
    // const userId = '1111'; //TODO 根据socketId找userId
    const userId = await client.hget(socketFindUserKey, socketId);
    const socketKey = getOnlineSocketKey(socketId);
    const userKey = getOnlineUserKey(userId);
    await client.del(socketKey);
    await client.del(userKey);
    await client.hdel(socketFindUserKey, socketId);
    await client.hdel(userFindSocketKey, userId);

  }
  // @SubscribeMessage('error')
  // onError(@ConnectedSocket() socket: Socket, msgData: string): string {
  //   console.log('TCL: EventsGateWay -> onError', 'error');
  //   return data;
  // }

  // @SubscribeMessage('connect_heartbeat')
  // onConnect_heartbeat(@ConnectedSocket() socket: Socket, msgData: string): string {
  //   console.log(
  //     'TCL: EventsGateWay -> onConnect_heartbeat',
  //     'connect_heartbeat',
  //   );
  //   return data;
  // }
  @SubscribeMessage('heartbeat')
  async onHeartbeat(@ConnectedSocket() socket: Socket, msgData: MsgData) {
    console.log("🚀 ~ file: events.gateway.ts ~ line 119 ~ EventsGateway ~ onHeartbeat ~ msgData", msgData);
    console.log("🚀 ~ file: events.gateway.ts ~ line 119 ~ EventsGateway ~ onHeartbeat ~ socket", socket.id);

    const client = this.redisService.client;
    const socketId = socket.id;
    const socketFindUserKey = getSocketFindUserKey();
    const userFindSocketKey = getUserFindSocketKey();
    // const userId = '1111';
    const userId = await client.hget(socketFindUserKey, socketId);
    const connectSocketKey = getConnectSocketKey(socketId);
    const onlineSocketKey = getOnlineSocketKey(socketId);
    await client.set(connectSocketKey, '', 'EX', 30);
    const isOnlineSocket = await client.exists(onlineSocketKey);
    if(isOnlineSocket) {
      await client.set(onlineSocketKey, '', 'EX', 30);
    }
    const onlineUserKey = getOnlineUserKey(userId);
    const isOnlineUser = await client.exists(onlineUserKey);
    if(isOnlineUser) {
      await client.set(onlineUserKey, '', 'EX', 30);
    }
  }
  @SubscribeMessage('msg')
  onMsg(@ConnectedSocket() socket: Socket, @MessageBody() msgData: MsgData) {
    console.log("🚀 ~ file: events.gateway.ts ~ line 143 ~ EventsGateway ~ onMsg ~ msgData", msgData)
    console.log("🚀 ~ file: events.gateway.ts ~ line 143 ~ EventsGateway ~ onMsg ~ socket", socket.id)
    const { meta, data: { type, data } } = msgData;
    const socketId = socket.id;

    switch(type) {
      case 'click':

        break;
      case 'scroll':

        break;
      case 'input':

        break;
    }
    // socket.emit();
    socket.broadcast.emit('res', { ...msgData, meta: { ...msgData.meta, from: socketId }})
  }
}
