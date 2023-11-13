import { Field, Int, ObjectType } from '@nestjs/graphql';
import { randomUUID } from 'crypto';

@ObjectType()
export class Message {
  @Field(() => String)
  id: string;

  @Field(() => String)
  message: string;
}
