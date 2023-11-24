import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class AccountModel {
  @Field(() => ID)
  id: string;

  // @Field(() => [ChatModel])
  // chat: ChatModel[];
}
