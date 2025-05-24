import {
  Entity,
  Column,
  OneToMany,
  PrimaryColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { v4 as uuidvg4 } from 'uuid';
import idPrefix from '~/constants/idPrefix';

@Entity()
export class Role {
  @PrimaryColumn({ type: 'varchar', length: 50 }) // Giả sử id là varchar để đồng bộ với consultant_id
  role_id!: string;

  @Column('varchar')
  name!: string;

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
    const prefix = idPrefix.ROLE;
    const uuidPart = uuidvg4().split('-')[0]; // Lấy 8 ký tự đầu của UUID
    this.role_id = `${prefix}-${uuidPart}`;
  }
}