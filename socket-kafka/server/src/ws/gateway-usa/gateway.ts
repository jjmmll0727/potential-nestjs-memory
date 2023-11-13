import { Logger, OnModuleInit } from '@nestjs/common';
import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway(81)
  export class WsUsaGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly logger: Logger){

    }
    /**
     * 
     * @param server 해당 gateway 가 실행되면 가장 먼저 실행되는 함수 -> handleConnection 보다 먼저 실행된다
     */
    afterInit(server: any) {
      this.logger.log('usa ws gateway started!')
    }
    /**
     * 
     * @description 연결이 되면 실행되는 함수
     */
    handleConnection(client: any, ...args: any[]) {
      this.logger.log('usa connected!')
      console.log(client.id);
    }
    /**
     * 
     * @description 연결이 끝나면 실행되는 함수
     */
    handleDisconnect(client: any) {
      this.logger.log('usa disConnected!')
      console.log(client.id);
    }
    @WebSocketServer()
    wsServer: Server;
  
    @SubscribeMessage('pub-message-usa')
    subMessage(@MessageBody() message: string): void {
      const rand = Math.floor(Math.random() * 10)
      if (rand % 2 == 0)
      this.wsServer.emit('sub-message-kor', message); // broadCast spread
      else
      this.wsServer.emit('sub-message-usa', message); // broadCast spread
    }

    @SubscribeMessage('pub-message-usa')
    pubMessage(@MessageBody() message: string): void {
      console.log('sub usa message - ', message);
      
    }
  }
  