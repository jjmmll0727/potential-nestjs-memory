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
          });
        } catch (error) {
          throw new Error('fail to insert');
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
