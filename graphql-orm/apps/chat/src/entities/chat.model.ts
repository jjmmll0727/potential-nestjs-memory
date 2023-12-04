import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoomModel {
  @Field(() => Number)
  roomId: number;

  // @Field(() => [UserModel])
  // users: UserModel[];
}
