import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('post')
export class PostEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, name: 'title' })
  title: string;

  @Column({ type: 'varchar', nullable: false, name: 'description' })
  description: string;
}
