import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/request';
import { PostRepository } from './repository/post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepo: PostRepository) {}

  async createPost(input: CreatePostInput) {
    await this.postRepo.createPost(input);
  }

  async getAllPost() {
    return await this.postRepo.getAllPost();
  }
}
