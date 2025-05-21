import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidvg4 } from 'uuid';
import idPrefix from '~/constants/idPrefix';

@Entity()
export class User {
  @PrimaryColumn('varchar')
  id!: string;

  @Column('varchar') // Chỉ định kiểu cột là varchar
  name!: string;

  @Column('varchar') // Chỉ định kiểu cột là varchar
  email!: string;

  @BeforeInsert()
  generateId() {
    const prefix = idPrefix.CUSTOMER;
    const uuidPart = uuidvg4().split('-')[0]; // Lấy 8 ký tự đầu của UUID
    const numericId = parseInt(uuidPart, 16).toString().padStart(8, '0'); // Chuyển hex sang số và đảm bảo 8 chữ số
    this.id = `${prefix}-${numericId}`;
  }
}


// import 'reflect-metadata';
// import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, BeforeInsert } from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column('varchar') // Chỉ định kiểu cột là varchar
//   name!: string;

//   @Column('varchar') // Chỉ định kiểu cột là varchar
//   email!: string;

// }