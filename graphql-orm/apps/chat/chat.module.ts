import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { MessageEntity, RoomEntity } from '@app/database/entity';
import { PostgresModule } from '@app/database';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PostgresModule, TypeOrmModule.forFeature([MessageEntity, RoomEntity])],
  providers: [ChatResolver, ChatService]
})
export class ChatModule {}
