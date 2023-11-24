import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { PostgresModule } from '@app/database';
import { UserEntity } from '@app/database/entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
@Module({
  imports: [
    PostgresModule,
    TypeOrmModule.forFeature([UserEntity]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: 'schema/account/schema.gql',
      },
      playground: true,
    }),
  ],
  providers: [AccountResolver, AccountService],
})
export class AccountModule {}
