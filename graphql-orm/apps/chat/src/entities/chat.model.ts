import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '.';

@ObjectType()
export class RoomModel {
  @Field(() => Number)
  roomId: number;

  @Field(() => [UserModel])
  users: UserModel[];
}
