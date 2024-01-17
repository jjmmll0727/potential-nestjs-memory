import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ database: 'nest-grow-up', name: 'company', schema: 'public' })
export class CompanyEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar', name: 'name' })
  name: string;
}
