import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Sse,
  MessageEvent,
  Param,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClientProxy } from '@nestjs/microservices';
import { fromEvent, interval, map, Observable } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') protected client: ClientProxy,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * @description
   * return 필요하면 client.send
   * return 필요없으면 client.emit
   */
  @Post()
  async createUser(@Body() input: any): Promise<void> {
    this.client.emit('createUser', input);
    const num = Math.ceil(Math.random() * 10);
    console.log(num % 2);
    this.eventEmitter.emit('create-user', num % 2);
  }

  @Get('users')
  async getUsers() {
    return this.client.send('getUsers', 'getUsers');
  }

  @Get()
  test(): Observable<string> {
    return this.client.send('test', 'test22');
  }

  /**
   * @description sse 는 백단에서 발생한 어떠한 이벤트에 의해 프론트로 액션을 해줄때 사용한다. ex) 주식 변동 및 트위터 알림
   * sse 는 client 는 데이터를 받을 수만 있다.
   */
  @Sse('sse/:topicId')
  sse(@Param('topicId') topicId: number): Observable<MessageEvent> {
    // return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
    return fromEvent(this.eventEmitter, 'create-user').pipe(
      map((_data) => {
        console.log(_data, topicId);
        if (_data == topicId) {
          return { data: { type: 'new user', randomNum: _data } };
        }
      }),
    );
  }
}
