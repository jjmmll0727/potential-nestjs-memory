import { Injectable } from '@nestjs/common';
import { RoomEntity } from 'lib/database/entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

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
    return await this.find();
  }

  async getRoom(id: string): Promise<RoomEntity> {
    return await this.findOne({
      where: {
        id: id,
      },
    });
  }

  /**
   *
   * @deprecated 다른 방법으로 트랜잭션 관리
   */
  async createRoom2(name: string): Promise<RoomEntity> {
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

  async createRoom(name: any): Promise<void> {
    try {
      await this.manager.transaction(async (entityManager) => {
        try {
          await entityManager.save(RoomEntity, { name: name });
        } catch (error) {
          throw new Error('duplicated key');
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
