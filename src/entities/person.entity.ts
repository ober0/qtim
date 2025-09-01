import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, Index } from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'persons' })
@Index(['firstName', 'lastName'])
@Index(['firstName', 'patronymic'])
@Index(['firstName', 'lastName', 'patronymic'])
export class Person {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'first_name' })
    firstName: string

    @Column({ name: 'last_name' })
    lastName: string

    @Column({ nullable: true })
    patronymic?: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @OneToOne(() => User, (user) => user.person)
    user: User
}
