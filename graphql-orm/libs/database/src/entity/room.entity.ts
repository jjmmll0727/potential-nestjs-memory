import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
