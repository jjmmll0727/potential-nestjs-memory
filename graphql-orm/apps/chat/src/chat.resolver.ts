import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
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

  @Query(() => [UserModel], { name: 'user' })
  init() {}

  /**
   *
   * @description 채팅방 하나에 여러명의 사람이 있다고 가정을 해보자
   * 채팅방 id가 1이면 userId 는 2,3,4
   */

  @Query(() => [RoomModel])
  async getAllRoomInfo(): Promise<RoomModel[]> {
    const result = await this.chatService.getAllRoomIds();
    const room: RoomModel[] = [];
    for (const r of result) {
      room.push({
        roomId: r.id.toString(),
      });
    }
    return room;
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
