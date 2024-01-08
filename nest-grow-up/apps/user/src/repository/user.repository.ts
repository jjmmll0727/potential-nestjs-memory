import { Injectable } from '@nestjs/common';
import { CompanyEntity, UserEntity } from 'libs/database/src/entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserInput } from '../dto/request';
import { UserOutput } from '../dto/response';

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
          await entityManager.save(UserEntity, {
            name: input.name,
            companyId: input.companyId,
          });
        } catch (error) {
          throw new Error('fail to insert');
        }
      });
      await this.getUsers();
    } catch (error) {
      throw error;
    }
  }

  async getUsers(): Promise<UserEntity[]> {
    const users1: UserEntity[] = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.companyId', 'company')
      .orderBy('user.createDate', 'DESC')
      .getMany();

    const users2: UserEntity[] = await this.createQueryBuilder('user')
      .leftJoinAndSelect(
        CompanyEntity,
        'company',
        'company.id = user.companyId',
      )
      .orderBy('user.id', 'DESC')
      .getMany();
    return users1;
  }
}
