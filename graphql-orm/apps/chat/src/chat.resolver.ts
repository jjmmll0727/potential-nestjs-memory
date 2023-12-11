import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { ChatLoader } from './chat.loader';
import { ChatService } from './chat.service';
import { UserModel, RoomModel } from './entities';

@Resolver(() => RoomModel)
// 이 resolver 는 chatModel 을 뽑아내기 위한 리졸버이다
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatLoader: ChatLoader,
  ) {}

  @Query(() => [UserModel])
  init() {}

  /**
   *
   * @description 전체 채팅방과 그 안에 포함된 유저들의 정보를 불러오자
   */

  @Query(() => [RoomModel])
  async getAllRoomInfo(): Promise<RoomModel[]> {
    return await this.chatService.getAllRoomIds();
  }

  @Mutation(() => RoomModel)
  async createRooom(@Args('name') name: string): Promise<RoomModel> {
    return await this.chatService.createRoom(name);
  }

  /**
   * @description user resolver 로 필요한 정보를 얻기 위한 쿼리 전송
   * roomId 로 그 안에 속해있는 유저들의 정보를 긁어와야 하는데,
   * resolveField 호출은 여러번 해도 실제 디비에서 조회하는 로직은 한번만 할 수 있도록
   */
  @ResolveField('users', () => [UserModel])
  async getUsers(@Parent() room: RoomModel): Promise<UserModel[]> {
    try {
      const result = await this.chatLoader.findByUserId.load(room.roomId);
      return result;
    } catch (error) {
      this.chatLoader.findByUserId.clear(room.roomId);
    }
  }
}
