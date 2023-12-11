import { Injectable } from '@nestjs/common';
import { RoomEntity } from 'lib/database/entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RoomRepository extends Repository<RoomEntity> {
  constructor(private dataSource: DataSource) {
    super(RoomEntity, dataSource.createEntityManager());
  }

  async getAllRoomIds(): Promise<RoomEntity[]> {
    return await this.createQueryBuilder().getMany();
  }
}
