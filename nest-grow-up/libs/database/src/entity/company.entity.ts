import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('company')
export class CompanyEntity {
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
}
