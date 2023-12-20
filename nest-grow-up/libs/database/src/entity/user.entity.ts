import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ nullable: false, type: 'varchar', name: 'name' })
  name: string;

  @CreateDateColumn({
    nullable: false,
    type: 'timestamp with time zone',
    name: 'create_date',
  })
  createDate: Date;

  // manytoone 의 기본은 무조건 참조 테이블의 pk 를 바라본다.
  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: 'company_id' })
  companyId: number;
}
