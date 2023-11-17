import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoomModel {
  @Field()
  rooomId: number;

  @Field()
  name: string;
}
