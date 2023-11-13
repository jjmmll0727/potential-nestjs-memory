import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ChatResolver } from './chat/chat.resolver';
import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';
import { PostgresModule } from '../libs/database/src/postgres.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'apps/schema.gql',
      path: 'v1/gql',
    }),
    ChatModule,
    PostgresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
