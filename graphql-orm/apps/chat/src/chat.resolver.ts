import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { UserModel, RoomModel } from './entities';

@Resolver(() => RoomModel)
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

  @Query(() => RoomModel)
  async getRoomInfo(
    @Args('roomId', { type: () => Int }) roomId: number,
  ): Promise<RoomModel> {
    return {
      roomId: roomId,
      users: [],
    };
    // return this.chatService.getChatInfo(roomId);
  }

  /**
   * @description user resolver 로 필요한 정보를 얻기 위한 쿼리 전송
   */
  @ResolveField('users', () => [UserModel])
  async getUsers(
    @Parent() chat: RoomModel,
  ): Promise<{ __typename: string; id: number }[]> {
    console.log(chat.roomId);
    const userIds: number[] = [1, 2, 3];
    return [
      { __typename: 'RoomModel', id: userIds[0] },
      { __typename: 'RoomModel', id: userIds[1] },
      { __typename: 'RoomModel', id: userIds[2] },
    ];
  }
}
