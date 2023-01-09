import { Entity, PrimaryGeneratedColumn, Column, Generated, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";

@Entity('majors')
export class Major {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    major: string

    @Column({ type: 'int'})
    code: number

    @Column()
    university: string

    @Column()
    educationCourse: string

    @Column()
    @Generated('increment')
    order: number;

    @ManyToOne(() => User, user => user.majors)
    user : User
}