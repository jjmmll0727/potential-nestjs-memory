import { Controller } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Message } from './model';

@Resolver('Chat')
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => Message)
  async getMessages(): Promise<Message> {
    return await this.chatService.getMessages();
  }
}
