import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { Chat, MessageModel } from './entities';

@Resolver(() => MessageModel)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => MessageModel)
  createChat(@Args('createChatInput') createChatInput: CreateChatInput) {
    return this.chatService.create(createChatInput);
  }

  @Query(() => [MessageModel], { name: 'chat' })
  findAll() {
    return this.chatService.findAll();
  }

  @Query(() => MessageModel)
  async getChatInfo(@Args('roomId', { type: () => Int }) roomId: number) {
    return this.chatService.getChatInfo(roomId);
  }
}
