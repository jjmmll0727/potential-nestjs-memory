import { Injectable } from '@nestjs/common';
import { RoomUserEntity } from 'lib/database/entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RoomUserRepository extends Repository<RoomUserEntity> {
  constructor(private dataSource: DataSource) {
    super(RoomUserEntity, dataSource.createEntityManager());
  }

  async findbyRoomId(roomId: number): Promise<RoomUserEntity> {
    return await this.createQueryBuilder().where({ id: roomId }).getOne();
  }

  async findbyRoomIds(roomIds: string[]): Promise<RoomUserEntity[]> {
    try {
      const result = await this.createQueryBuilder()
        .where('room_id in (:...roomIds)', { roomIds: roomIds })
        .getRawMany();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
