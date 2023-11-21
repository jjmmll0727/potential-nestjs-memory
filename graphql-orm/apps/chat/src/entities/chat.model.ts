import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatModel {
  @Field(() => Number)
  chatId: number;

  // @Field(() => AccountModel)
  // user: AccountModel;
}
