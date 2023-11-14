import { PostgresModule } from '../../libs/database/src/postgres.module';
import { Module } from '@nestjs/common';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from '../../libs/database/src/entity';

@Module({
  imports: [PostgresModule, TypeOrmModule.forFeature([MessageEntity])],
  providers: [ChatResolver, ChatService],
})
export class ChatModule {}
