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
  findByUserId = new DataLoader<number, UserModel[]>(
    async (roomIds: number[]) => {
      const temp = await this.roomUserRepository.findbyRoomIds([
        '23bfddea-ef11-413f-940d-0101fc8ab23c',
      ]);
      console.log('temp -> ', temp);
      // 여기 있는 roomIds 에 있는 아이템들이 key 가 된다.
      const userModels = {
        4: [{ id: '4' }, { id: '8' }, { id: '12' }],
        5: [{ id: '5' }, { id: '10' }, { id: '15' }],
        6: [{ id: '6' }, { id: '12' }, { id: '18' }],
      };
      const userModelGroup: { [key: number]: UserModel[] } = {};
      for (const roomId of roomIds) {
        if (!userModelGroup[roomId]) {
          userModelGroup[roomId] = [];
        }
        userModelGroup[roomId] = userModels[roomId] ?? [];
      }
      const result = roomIds.map((roomId: number) => userModelGroup[roomId]);

      console.log(result);
      return result;
    },
    { cache: true },
  );
}
