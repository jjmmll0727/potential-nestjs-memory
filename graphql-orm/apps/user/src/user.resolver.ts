import { Resolver, Query, ResolveReference } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './entities/user.model';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel], { name: 'user' })
  init() {}

  /**
   *
   * @description chat resolver 에서 처리하지 못하는 쿼리를 여기서 처리함 (find user)
   * resolverField 를 여기서 수신해서 처리한다.
   */
  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<UserModel> {
    return await this.userService.getUser(reference.id);
  }
}
