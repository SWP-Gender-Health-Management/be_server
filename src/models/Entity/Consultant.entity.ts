import 'reflect-metadata';
import {
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    BeforeInsert,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
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

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @UpdateDateColumn({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at!: Date;

    @Column({ type: 'varchar', length: 20, default: 'active' })
    status!: string;


    @BeforeInsert()
    generateId() {
        const prefix = idPrefix.CONSULTANT;
        const uuidPart = uuidvg4().split('-')[0]; // Lấy 8 ký tự đầu của UUID
        // const numericId = parseInt(uuidPart, 16).toString().padStart(8, '0'); // Chuyển hex sang số và đảm bảo 8 chữ số
        this.consultant_id = `${prefix}-${uuidPart}`;
    }
}
