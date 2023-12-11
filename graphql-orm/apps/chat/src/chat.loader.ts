import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UserModel } from './entities/user.model';
import { RoomUserRepository } from './repository';

/**
 * @description resolveReference 에서 디비에서 찾는데, dataloader 를 사용하면 여기서 찾을 수 있다.
 */
@Injectable({ scope: Scope.REQUEST })
export class ChatLoader {
  constructor(private readonly roomUserRepository: RoomUserRepository) {}
  findByUserId = new DataLoader<string, UserModel[]>(
    async (roomIds: string[]) => {
      const roomUser = await this.roomUserRepository.findbyRoomIds(roomIds);

      const userModelGroup: { [key: string]: UserModel[] } = {};
      for (const roomId of roomIds) {
        if (!userModelGroup[roomId]) {
          userModelGroup[roomId] = [];
        }
        const userInfo: UserModel[] = [];
        roomUser.map((r) => {
          if (r.roomId == roomId) {
            userInfo.push({
              id: r.userId,
            });
          }
        });

        userModelGroup[roomId] = userInfo ?? [];
      }
      const result = roomIds.map((roomId: string) => userModelGroup[roomId]);

      return result;
    },
    { cache: true },
  );
}
