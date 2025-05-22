import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Consultant } from './Consultant.entity';

@Entity()
export class Major {
  @PrimaryColumn({ type: 'varchar', length: 50 }) // Giả sử id là varchar để đồng bộ với consultant_id
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => Consultant, (consultant) => consultant.major)
  consultants!: Consultant[]; // Mối quan hệ One-to-Many với Consultant
}