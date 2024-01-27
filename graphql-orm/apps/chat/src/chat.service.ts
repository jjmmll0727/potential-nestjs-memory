import { Injectable } from '@nestjs/common';
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
        name: r.name,
      });
    }
    return result;
  }

  async createRoom(name: string): Promise<void> {
    try {
      await this.roomRepo.createRoom(name);
    } catch (error) {
      throw error;
    }
  }

  async controlTransaction(
    input: any,
    func: (input: any) => Promise<any>,
  ): Promise<any> {
    const result = await func(input);
    return result;
  }
}
