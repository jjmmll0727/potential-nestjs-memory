import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { AccountModel, ChatModel } from './entities';

@Resolver(() => ChatModel)
// 이 resolver 는 chatModel 을 뽑아내기 위한 리졸버이다
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  // @Mutation(() => ChatModel)
  // createChat(@Args('createChatInput') createChatInput: CreateChatInput) {
  //   return this.chatService.create(createChatInput);
  // }

  // @Query(() => [ChatModel], { name: 'chat' })
  // findAll() {
  //   return this.chatService.findAll();
  // }

  @Query(() => ChatModel)
  async getChatInfo(
    @Args('roomId', { type: () => Int }) roomId: number,
  ): Promise<ChatModel> {
    return {
      chatId: roomId,
    };
    // return this.chatService.getChatInfo(roomId);
  }

  /**
   * @description user resolver 로 필요한 정보를 얻기 위한 쿼리 전송
   */
  @ResolveField(() => AccountModel)
  user(@Parent() chat: ChatModel) {
    return { __typename: 'UserEntity', id: chat.chatId };
  }
}
