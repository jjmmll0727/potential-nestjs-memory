import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') protected client: ClientProxy) {}

  /**
   * @description
   * return 필요하면 client.send
   * return 필요없으면 client.emit
   */
  @Post()
  async createUser(@Body() input: any): Promise<void> {
    this.client.emit('createUser', input);
  }

  @Get()
  test(): Observable<string> {
    return this.client.send('test', 'test22');
  }
}
