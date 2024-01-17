import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ database: 'nest-grow-up2', name: 'gym', schema: 'public' })
export class GymEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, name: 'origin' })
  origin: string;

  @Column({ type: 'varchar', nullable: false, name: 'region' })
  region: string;
}
