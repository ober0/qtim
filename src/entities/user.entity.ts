import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, Generated } from 'typeorm'
import { Password } from './password.entity'
import { Person } from './person.entity'

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    email: string

    @Column({ type: 'integer', unique: true })
    @Generated('increment')
    frontendId: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @OneToOne(() => Password, (password) => password.user, { cascade: true })
    @JoinColumn({ name: 'passwordId' })
    password: Password

    @Column({ unique: true })
    passwordId: string

    @OneToOne(() => Person, (person) => person.user, { cascade: true })
    @JoinColumn({ name: 'personId' })
    person: Person

    @Column({ unique: true })
    personId: string
}
