import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { v4 as uuidvg4 } from 'uuid';
import idPrefix from '~/constants/idPrefix';
import { Consultant } from './Consultant.entity';

@Entity()
export class LaborarityService {
  @PrimaryColumn({ type: 'varchar', length: 50 }) // Giả sử id là varchar để đồng bộ với consultant_id
  laborarity_id!: string;

  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Column('varchar')
  description!: string;

  @Column('double')
  price!: number;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;

  @BeforeInsert()
  generateId() {
    const prefix = idPrefix.LABORARITY_SERVICE;
    const uuidPart = uuidvg4().split('-')[0]; // Lấy 8 ký tự đầu của UUID
    this.laborarity_id = `${prefix}-${uuidPart}`;
  }
}