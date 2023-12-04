import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UserModel } from './entities/user.model';

/**
 * @description resolveReference 에서 디비에서 찾는데, dataloader 를 사용하면 여기서 찾을 수 있다.
 * { '1': [ { id: '1' } ], '2': [ { id: '2' } ] } 반드시 이 형식으로 보내야 한다.
 */
@Injectable({ scope: Scope.REQUEST })
export class ChatLoader {
  findByUserId = new DataLoader<number, UserModel[]>(
    async (roomIds: number[]) => {
      console.log(roomIds);
      //   const orderItems: UserModel[] =
      //     await this.orderItemRepo.findByOrderIds(orderIds);
      const userModels: UserModel[] = [
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
      ];
      const userModelGroup: { [key: number]: UserModel[] } = {};
      userModels.forEach((userModel: UserModel) => {
        if (!userModelGroup[userModel.id]) {
          userModelGroup[userModel.id] = [];
        }
        userModelGroup[userModel.id].push(userModel);
      });
      console.log('userModelGroup ->', userModelGroup);
      console.log(roomIds.map((roomId: number) => userModelGroup[roomId]));
      return roomIds.map((roomId: number) => userModelGroup[roomId]);
    },
  );
}
