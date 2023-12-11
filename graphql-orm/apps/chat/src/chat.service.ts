import { Injectable } from '@nestjs/common';
import { RoomEntity } from 'lib/database/entity';
import { RoomRepository } from './repository';

@Injectable()
export class ChatService {
  constructor(private readonly roomRepo: RoomRepository) {}
  findAll() {
    return `This action returns all chat`;
  }

  async getAllRoomIds(): Promise<RoomEntity[]> {
    return await this.roomRepo.getAllRoomIds();
  }
}
