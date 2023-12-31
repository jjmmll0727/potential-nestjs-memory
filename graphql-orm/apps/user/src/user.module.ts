import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PostgresModule } from '@app/database';
import { UserEntity } from '@app/database/entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { UserRepository } from './repository';
@Module({
  imports: [
    PostgresModule,
    TypeOrmModule.forFeature([UserEntity]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: 'schema/user/schema.gql',
      },
      sortSchema: true,
      playground: true,
    }),
  ],
  providers: [UserResolver, UserService, UserRepository],
})
export class UserModule {}
