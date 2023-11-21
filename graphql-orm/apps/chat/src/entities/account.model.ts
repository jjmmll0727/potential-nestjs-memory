import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { ChatModel } from './chat.model';

@ObjectType()
@Directive('@key(fields: "id")')
export class AccountModel {
  @Field(() => ID)
  id: string;

  // @Field(() => [ChatModel])
  // chat: ChatModel[];
}
