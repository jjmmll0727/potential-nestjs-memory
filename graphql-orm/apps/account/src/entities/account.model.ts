import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
// 동일 이름의 objectType 이 있으면 안된다
// -> 동일한 objectType 이 있다면 반드시 @Directive('@key(fields: "id")') 로 obejct 의 pk 를 설정해줘야 함
export class AccountModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;
}
