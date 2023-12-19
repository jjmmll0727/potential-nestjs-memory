import { Controller, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
  ) {}

  @MessagePattern('test')
  test(): string {
    return 'test입니다';
  }
}
