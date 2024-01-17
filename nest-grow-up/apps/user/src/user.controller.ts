import { Controller, Sse, MessageEvent, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserInput } from './dto/request';
import { interval, Observable, map, fromEvent } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.eventEmitter = new EventEmitter2();
  }

  @MessagePattern('test')
  test(): string {
    return 'test 입니다';
  }

  @MessagePattern('createUser')
  async createUser(input: CreateUserInput): Promise<void> {
    await this.userService.createUser(input);
  }

  @MessagePattern('getUsers')
  async getUsers() {
    // this.eventEmitter.emit('sse-test');
    // console.log(this.eventEmitter);
    return await this.userService.getUsers();
  }

  /**
   * @description sse 는 백단에서 발생한 어떠한 이벤트에 의해 프론트로 액션을 해줄때 사용한다. ex) 주식 변동 및 트위터 알림
   * sse 는 client 는 데이터를 받을 수만 있다.
   */
  @Sse('sse')
  sse(): Observable<MessageEvent> {
    console.log('1 1 1 1 1 1 1 1 1 1 1');
    return fromEvent(this.eventEmitter, 'sse-test').pipe(
      map((d) => {
        return new MessageEvent('sse-test', { data: 'sse-test' });
      }),
    );
  }
}
