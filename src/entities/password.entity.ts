import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'password' })
export class Password {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    password: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @OneToOne(() => User, (user) => user.password)
    user: User
}
