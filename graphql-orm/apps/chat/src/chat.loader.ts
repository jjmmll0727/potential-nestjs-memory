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
      const userModels: UserModel[] = [{ id: '1' }, { id: '2' }];
      const userModelGroup: { [key: number]: UserModel[] } = {};
      userModels.forEach((userModel: UserModel) => {
        if (!userModelGroup[userModel.id]) {
          userModelGroup[userModel.id] = [];
        }
        userModelGroup[userModel.id].push(userModel);
      });
      return roomIds.map((orderId: number) => userModelGroup[orderId]);
    },
  );
}
