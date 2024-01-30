import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity, GymEntity, UserEntity } from 'libs/database/src/entity';
import {
  BaseEntity,
  DataSource,
  EntityManager,
  EntityRepository,
  Repository,
} from 'typeorm';
import { CreateUserInput } from '../dto/request';
import { UserOutput } from '../dto/response';

// @Injectable()
// export class UserRepository extends Repository<UserEntity> {
//   constructor(private dataSource: DataSource) {
//     super(
//       UserEntity,
//       dataSource.createEntityManager(),
//       dataSource.createQueryRunner(),
//     );
//   }

//   async createUser(input: CreateUserInput): Promise<void> {
//     try {
//       await this.manager.transaction(async (entityManager) => {
//         try {
//           await entityManager.save(UserEntity, {
//             name: input.name,
//             companyId: input.companyId,
//           });
//         } catch (error) {
//           throw new Error('fail to insert');
//         }
//       });
//       await this.getUsers();
//     } catch (error) {
//       throw error;
//     }
//   }

//   async getUsers(): Promise<UserEntity[]> {
//     const test = await this.getGymListWithUser();
//     console.log(test);
//     const users1: UserEntity[] = await this.createQueryBuilder('user')
//       .leftJoinAndSelect('user.companyId', 'company')
//       .orderBy('user.createDate', 'DESC')
//       .getMany();

//     const users2: UserEntity[] = await this.createQueryBuilder('user')
//       .leftJoinAndSelect(
//         CompanyEntity,
//         'company',
//         'company.id = user.companyId',
//       )
//       .orderBy('user.id', 'DESC')
//       .getMany();
//     return users2;
//   }

//   async getGymListWithUser() {
//     const gym = this.dataSource.getRepository(GymEntity);
//     console.log(gym.find());
//     // const result = await this.createQueryBuilder('user')
//     //   .leftJoinAndSelect(GymEntity, 'gym', 'gym.id = user.gym_id')
//     //   .getMany();

//     return true;
//   }
// }

@Injectable()
export class UserRepository {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @InjectEntityManager('two')
    private readonly entityManager2: EntityManager,
  ) {}

  async createUser(input: CreateUserInput): Promise<void> {
    try {
      await this.entityManager.transaction(async (entityManager) => {
        try {
          await entityManager.save(UserEntity, {
            name: input.name,
            companyId: input.companyId,
          });
        } catch (error) {
          throw new Error('fail to insert');
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async getUsers(): Promise<UserEntity[]> {
    const gymList = await this.getGymList();

    const users2: UserEntity[] = await this.entityManager
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .leftJoinAndSelect(
        CompanyEntity,
        'company',
        'company.id = user.companyId',
      )
      .orderBy('user.id', 'DESC')
      .getMany();

    console.log(users2);
    const user: UserEntity[] = await this.entityManager
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.companyId', 'company')
      .orderBy('user.createDate', 'DESC')
      .getMany();

    return user;
  }

  async getGymList() {
    const result = await this.entityManager2
      .getRepository(GymEntity)
      .createQueryBuilder('gym')
      .getMany();
    return result;
  }
}
