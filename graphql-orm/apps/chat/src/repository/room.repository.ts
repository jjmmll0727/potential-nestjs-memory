import { Injectable } from '@nestjs/common';
import { RoomEntity } from 'lib/database/entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RoomRepository extends Repository<RoomEntity> {
  constructor(private dataSource: DataSource) {
    super(
      RoomEntity,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async getAllRoomIds(): Promise<RoomEntity[]> {
    return await this.createQueryBuilder().getMany();
  }

  async getRoom(id: string): Promise<RoomEntity> {
    return await this.createQueryBuilder().where({ id: id }).getOne();
  }

  async createRoom(name: string): Promise<RoomEntity> {
    try {
      await this.queryRunner.startTransaction();
      const result = this.save({ name: name });
      // await this.queryRunner.commitTransaction();
      await this.queryRunner.commitTransaction();
      return result;
    } catch (error) {
      // await this.queryRunner.rollbackTransaction();
      await this.queryRunner.rollbackTransaction();
    } finally {
      // await this.queryRunner.rollbackTransaction();
      // await this.queryRunner.release();
      // queryRunner.release();
    }
  }
}
