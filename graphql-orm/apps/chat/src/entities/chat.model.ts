import { Field, ObjectType } from '@nestjs/graphql';
import { AccountModel } from '.';

@ObjectType()
export class RoomModel {
  @Field(() => Number)
  roomId: number;

  @Field(() => [AccountModel])
  users: AccountModel[];
}
