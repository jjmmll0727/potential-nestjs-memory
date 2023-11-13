import { Injectable } from '@nestjs/common';
import { Message } from './model';

@Injectable()
export class ChatService {
  async getMessages(): Promise<Message> {
    return {
      id: 'sample id',
      message: 'sample message',
    };
  }
}
