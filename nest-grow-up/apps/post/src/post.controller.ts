import { Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreatePostInput } from './dto/request';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern('createPost')
  createPost(input: CreatePostInput) {
    this.postService.createPost(input);
  }

  @MessagePattern('getAllPost')
  async getAllPost() {
    return await this.postService.getAllPost();
  }
}
