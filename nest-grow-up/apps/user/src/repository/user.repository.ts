import { Injectable } from '@nestjs/common';
import { UserEntity } from 'libs/database/src/entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserInput } from '../dto/request';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(
      UserEntity,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async createUser(input: CreateUserInput): Promise<void> {
    try {
      await this.manager.transaction(async (entityManager) => {
        try {
          await entityManager.save(UserEntity, { name: input.name });
        } catch (error) {
          throw new Error('duplicated key');
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
