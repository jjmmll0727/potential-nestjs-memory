import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserInput } from './dto/request';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    return await this.userService.getUsers();
  }
}
