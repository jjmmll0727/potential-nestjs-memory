import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Entity('room-user')
export class RoomUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ nullable: true, name: 'room_id' })
  roomId: string;

  @Column({ nullable: true, name: 'user_id' })
  userId: string;
}
