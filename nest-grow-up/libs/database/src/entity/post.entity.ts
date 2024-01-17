import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({ database: 'nest-grow-up', name: 'post', schema: 'public' })
export class PostEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, name: 'title' })
  title: string;

  @Column({ type: 'varchar', nullable: false, name: 'description' })
  description: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: number;
}
