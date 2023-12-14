import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('room')
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  name: string;
}
