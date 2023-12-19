import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', name: 'name' })
  name: string;

  @CreateDateColumn({
    nullable: false,
    type: 'timestamp with time zone',
    name: 'create_date',
  })
  createDate: Date;
}
