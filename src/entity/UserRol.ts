
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users_roles')
export class UserRol extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    userid: number;

    @Column({type: 'varchar'})
    rolid: number;

    // model methods
}