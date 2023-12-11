import { Injectable } from '@nestjs/common';
import { UserEntity } from 'lib/database/entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async getUser(userId: string): Promise<UserEntity> {
    return await this.createQueryBuilder().where({ id: userId }).getOne();
  }
}
