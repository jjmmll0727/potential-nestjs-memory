import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoomModel {
  @Field(() => ID)
  roomId: string;

  @Field(() => String)
  name?: string;

  // @Field(() => [UserModel])
  // users: UserModel[];
}
