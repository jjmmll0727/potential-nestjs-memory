import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { CompanyEntity } from './company.entity';
import { GymEntity } from './gym.entity';

@Entity({ database: 'nest-grow-up', name: 'user', schema: 'public' })
export class UserEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar', name: 'name' })
  name: string;

  // manytoone 의 기본은 무조건 참조 테이블의 pk 를 바라본다.
  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: 'company_id' })
  companyId: number;

  @Column({ type: 'integer', name: 'gym_id', nullable: true })
  gymId: number;
}
