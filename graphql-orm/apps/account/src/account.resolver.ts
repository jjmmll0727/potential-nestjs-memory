import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { AccountService } from './account.service';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { AccountModel } from './entities/account.model';

@Resolver(() => AccountModel)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => AccountModel)
  createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return this.accountService.create(createAccountInput);
  }

  @Query(() => [AccountModel], { name: 'account' })
  findAll() {
    return this.accountService.findAll();
  }

  @Query(() => AccountModel, { name: 'account' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.accountService.findOne(id);
  }

  @Mutation(() => AccountModel)
  updateAccount(
    @Args('updateAccountInput') updateAccountInput: UpdateAccountInput,
  ) {
    return this.accountService.update(
      updateAccountInput.id,
      updateAccountInput,
    );
  }

  @Mutation(() => AccountModel)
  removeAccount(@Args('id', { type: () => Int }) id: number) {
    return this.accountService.remove(id);
  }

  /**
   *
   * @description chat resolver 에서 처리하지 못하는 쿼리를 여기서 처리함 (find account)
   * resolverField 를 여기서 수신해서 처리한다.
   */
  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): AccountModel {
    return {
      id: reference.id,
      name: `${reference.id} + name`,
    };
  }
}
