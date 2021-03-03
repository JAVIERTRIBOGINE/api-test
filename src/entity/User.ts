
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    alias: string;

    @Column({type: 'varchar'})
    mail: string;

    @Column({type: 'varchar'})
    password: string;


    // model methods
}