import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';

@Injectable()
export class ChatService {
  create(createChatInput: CreateChatInput) {
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chat`;
  }

  async getChatInfo(roomId: number) {
    return 'true';
  }
}
