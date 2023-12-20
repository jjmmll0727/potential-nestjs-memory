import { Injectable } from '@nestjs/common';
import {
  CompanyEntity,
  PostEntity,
  UserEntity,
} from 'libs/database/src/entity';
import { DataSource, Repository } from 'typeorm';
import { CreatePostInput } from '../dto/request';

@Injectable()
export class PostRepository extends Repository<PostEntity> {
  constructor(private dataSource: DataSource) {
    super(
      PostEntity,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async createPost(input: CreatePostInput): Promise<void> {
    try {
      await this.manager.transaction(async (entityManager) => {
        try {
          await entityManager.save(PostEntity, {
            title: input.title,
            description: input.description,
            userId: input.userId,
          });
        } catch (error) {
          throw new Error(error);
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllPost() {
    const posts = await this.createQueryBuilder('post')
      .innerJoinAndSelect('post.userId', 'user')
      .leftJoinAndSelect('user.companyId', 'company')
      .getMany();
    return posts;
  }
}
