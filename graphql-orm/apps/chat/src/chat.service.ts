import { Injectable } from '@nestjs/common';
import { RoomEntity } from 'lib/database/entity';
import { RoomModel } from './entities';
import { RoomRepository } from './repository';

@Injectable()
export class ChatService {
  constructor(private readonly roomRepo: RoomRepository) {}
  findAll() {
    return `This action returns all chat`;
  }

  async getAllRoomIds(): Promise<RoomModel[]> {
    const rooms = await this.roomRepo.getAllRoomIds();
    const result: RoomModel[] = [];
    for (const r of rooms) {
      result.push({
        roomId: r.id.toString(),
      });
    }
    return result;
  }
}
