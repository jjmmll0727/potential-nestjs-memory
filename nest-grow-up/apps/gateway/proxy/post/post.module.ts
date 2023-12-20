import { Module } from '@nestjs/common';
import { POST_FACTORY } from 'libs/common/src/factory/client.proxy';
import { PostController } from './post.controller';

@Module({
  controllers: [PostController],
  providers: [POST_FACTORY],
})
export class PostModule {}
