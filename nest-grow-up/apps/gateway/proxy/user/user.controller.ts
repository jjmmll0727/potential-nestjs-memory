import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') protected client: ClientProxy) {}

  @Get()
  test(): Observable<string> {
    return this.client.send<string, string>('test', 'test123');
  }
}
