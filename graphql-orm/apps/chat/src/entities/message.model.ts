import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { RoomModel } from '.';

@ObjectType()
@Directive('@key(fields: "messageId")')
export class MessageModel {
  @Field(() => Number)
  messageId: number;

  @Field(() => Number)
  userId: number;

  @Field(() => RoomModel)
  roomInfo: RoomModel;
}
