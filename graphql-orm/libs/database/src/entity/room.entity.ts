import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Entity('room')
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ nullable: true })
  name: string;
}
