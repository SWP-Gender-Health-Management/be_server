import 'reflect-metadata';
import {
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    BeforeInsert,
    JoinColumn  
} from 'typeorm';
import { v4 as uuidvg4 } from 'uuid';
import idPrefix from '~/constants/idPrefix';
import { Major } from './Major.entity';

@Entity()
export class Consultant {
    @PrimaryColumn('varchar')
    consultant_id!: string;

    @Column('varchar') // Chỉ định kiểu cột là varchar
    account_id!: string;

    @Column({ type: 'varchar', length: 50 })
    @JoinColumn({ name: 'major_id' }) // Chỉ định major_id là foreign key
    @ManyToOne(() => Major, (major) => major.consultants)
    major!: Major; // Mối quan hệ Many-to-One với Major

    @Column('varchar') // Chỉ định kiểu cột là varchar
    yoe!: number;


    @BeforeInsert()
    generateId() {
        const prefix = idPrefix.CONSULTANT;
        const uuidPart = uuidvg4().split('-')[0]; // Lấy 8 ký tự đầu của UUID
        // const numericId = parseInt(uuidPart, 16).toString().padStart(8, '0'); // Chuyển hex sang số và đảm bảo 8 chữ số
        this.consultant_id = `${prefix}-${uuidPart}`;
    }
}
