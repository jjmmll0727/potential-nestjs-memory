import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UserModel } from './entities/user.model';

/**
 * @description resolveReference 에서 디비에서 찾는데, dataloader 를 사용하면 여기서 찾을 수 있다.
 */
@Injectable({ scope: Scope.REQUEST })
export class ChatLoader {
  findByUserId = new DataLoader<number, UserModel[]>(
    async (roomIds: number[]) => {
      console.log(roomIds);
      //   const orderItems: UserModel[] =
      //     await this.orderItemRepo.findByOrderIds(orderIds);
      // const userModels: UserModel[] = [
      //   { id: '1' },
      //   { id: '2' },
      //   { id: '3' },
      //   { id: '4' },
      //   { id: '5' },
      //   { id: '6' },
      // ];

      const userModels2 = {
        4: [{ id: '4' }, { id: '8' }, { id: '12' }],
        5: [{ id: '5' }, { id: '10' }, { id: '15' }],
        6: [{ id: '6' }, { id: '12' }, { id: '18' }],
      };
      const userModelGroup: { [key: number]: UserModel[] } = {};
      for (const roomId of roomIds) {
        if (!userModelGroup[roomId]) {
          userModelGroup[roomId] = [];
        }
        userModelGroup[roomId] = userModels2[roomId];
      }
      // userModels.forEach((userModel: UserModel) => {
      //   if (!userModelGroup[userModel.id]) {
      //     userModelGroup[userModel.id] = [];
      //   }
      //   userModelGroup[userModel.id].push(userModel);
      // });
      console.log(userModelGroup);
      // console.log(roomIds.map((roomId: number) => userModelGroup[roomId]));
      return roomIds.map((roomId: number) => userModelGroup[roomId]);
    },
  );
}
