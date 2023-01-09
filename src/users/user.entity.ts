import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm";
import { Major } from './../majors/major.entity';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    username: string

    @Column({ unique : true })
    gmail: string
    
    @Column()
    password: string

    @OneToMany(() => Major, major => major.user)
    majors : Major[]
}