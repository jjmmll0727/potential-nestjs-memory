import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('post')
export class PostController {
  constructor(@Inject('POST_SERVICE') protected client: ClientProxy) {}

  @Post()
  createPost(@Body() input: any) {
    this.client.emit('createPost', input);
  }
}
