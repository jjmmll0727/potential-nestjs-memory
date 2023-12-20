import { Module } from '@nestjs/common';
import { PostgresqlModule } from 'libs/database/src/postgresql.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './repository/post.repository';

@Module({
  imports: [PostgresqlModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
