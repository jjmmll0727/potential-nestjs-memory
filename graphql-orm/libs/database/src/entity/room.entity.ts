import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('room')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
