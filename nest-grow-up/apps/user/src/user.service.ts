import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/request';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createUser(input: CreateUserInput) {
    await this.userRepo.createUser(input);
  }
}
