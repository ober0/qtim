import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'article' })
@Index('IDX_article_title', ['title'])
@Index('IDX_article_author_id', ['authorId'])
export class Article {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'title' })
    title: string

    @Column({ name: 'content' })
    content: string

    @ManyToOne(() => User, (user) => user.articles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'author_id' })
    author: User

    @Column({ name: 'author_id' })
    authorId: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}
