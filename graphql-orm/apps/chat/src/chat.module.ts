import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import {
  MessageEntity,
  RoomEntity,
  RoomUserEntity,
} from '@app/database/entity';
import { PostgresModule } from '@app/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { ChatLoader } from './chat.loader';
import { RoomRepository, RoomUserRepository } from './repository';

@Module({
  imports: [
    PostgresModule,
    TypeOrmModule.forFeature([MessageEntity, RoomEntity, RoomUserEntity]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: 'schema/chat/schema.gql',
      },
      sortSchema: true,
      playground: true,
    }),
  ],
  providers: [
    ChatResolver,
    ChatService,
    ChatLoader,
    RoomUserRepository,
    RoomRepository,
  ],
})
export class ChatModule {}
