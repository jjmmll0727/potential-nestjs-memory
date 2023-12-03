import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Entity('room-user')
export class RoomUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ nullable: true })
  roomId: string;

  @Column({ nullable: true })
  userId: string;
}
