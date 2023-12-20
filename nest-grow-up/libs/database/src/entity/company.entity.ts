import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('company')
export class CompanyEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar', name: 'name' })
  name: string;
}
