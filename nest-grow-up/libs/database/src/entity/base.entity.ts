import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyEntity } from './company.entity';

export class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @CreateDateColumn({
    nullable: false,
    type: 'timestamp with time zone',
    name: 'create_date',
  })
  createDate: Date;

  @UpdateDateColumn({
    nullable: false,
    type: 'timestamp with time zone',
    name: 'update_date',
  })
  updateDate: Date;
}
