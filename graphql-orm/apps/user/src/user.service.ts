import { Injectable } from '@nestjs/common';
import { UserModel } from './entities/user.model';
import { UserRepository } from './repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  async getUser(userId: string): Promise<UserModel> {
    const user = await this.userRepo.getUser(userId);
    const result: UserModel = {
      id: user.id,
      name: user.name,
    };
    return result;
  }
}
