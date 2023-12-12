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

  async getRoom(id: string): Promise<RoomEntity> {
    return await this.createQueryBuilder().where({ id: id }).getOne();
  }

  async createRoom(name: string): Promise<RoomEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await queryRunner.manager.save(RoomEntity, { name: name });
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
