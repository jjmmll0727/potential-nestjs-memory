import { Logger, OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway(80)
  export class WsKorGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly logger: Logger){
    }
    @WebSocketServer()
    wsServer: Server;
    /**
     * 
     * @param server 해당 gateway 가 실행되면 가장 먼저 실행되는 함수 -> handleConnection 보다 먼저 실행된다
     */
    afterInit(server: any) {
      this.logger.log('kor ws gateway started!')
    }
    /**
     * 
     * @description 연결이 되면 실행되는 함수
     */
    handleConnection(client: any, ...args: any[]) {
      this.logger.log('kor connected!')
      console.log(client.id);
    }
    /**
     * 
     * @description 연결이 끝나면 실행되는 함수
     */
    handleDisconnect(client: any) {
      this.logger.log('kor disConnected!')
      console.log(client.id);
    }

    // connection 이 일어나면 가장 먼저 실행될 함수 
    // onModuleInit() {
    //   this.wsServer.on('connection', (socket) => {
    //     console.log('!! connection !!')
    //     console.log(socket.id);
    //   })
    // }
  
    @SubscribeMessage('pub-message-kor')
    subMessage(@MessageBody() message: string): void {
      const rand = Math.floor(Math.random() * 10)
      if (rand % 2 == 0)
      this.wsServer.emit('sub-message-kor', message); // broadCast spread
      else
      this.wsServer.emit('sub-message-usa', message); // broadCast spread


    }

    @SubscribeMessage('sub-message-kor')
    pubMessage(@MessageBody() message: string): void {
      console.log('sub kor message - ', message);
      
    }
  }
  