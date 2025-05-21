import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar') // Chỉ định kiểu cột là varchar
  name!: string;

  @Column('varchar') // Chỉ định kiểu cột là varchar
  email!: string;
}