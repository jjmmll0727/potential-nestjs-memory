import { Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern('createPost')
  createPost(input: any) {
    this.postService.getHello();
  }
}
