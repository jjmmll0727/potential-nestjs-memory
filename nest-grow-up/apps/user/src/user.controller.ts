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
}
