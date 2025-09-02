import { Injectable } from '@nestjs/common'
import { ArticleCreateDto } from './dto/create'
import { ArticleResponseDto } from './dto/response'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../entities/user.entity'
import { Repository } from 'typeorm'
import { Article } from '../../entities/article.entity'
import { UserBaseDto } from '../user/dto/base.dto'
import { ArticleSearchDto } from './dto/search'

@Injectable()
export class ArticleRepository {
    constructor(
        @InjectRepository(Article)
        private readonly repo: Repository<Article>
    ) {}

    async create(dto: ArticleCreateDto, user: UserBaseDto): Promise<ArticleResponseDto> {
        const article: Article = this.repo.create({
            title: dto.title,
            content: dto.content,
            authorId: user.id
        })

        return this.repo.save(article)
    }

    async findOneById(id: string) {
        return this.repo.findOne({
            where: { id },
            relations: ['author']
        })
    }

    async update(dto: ArticleCreateDto, id: string) {
        await this.repo.update(
            { id },
            {
                title: dto.title,
                content: dto.content
            }
        )
        return this.repo.findOne({
            where: { id },
            relations: ['author']
        })
    }

    async delete(id: string) {
        return this.repo.delete(id)
    }

    async search(dto: ArticleSearchDto) {
        const qb = this.repo.createQueryBuilder('article').leftJoinAndSelect('article.author', 'author')

        if (dto.filters) {
            if (dto.filters.title) {
                qb.andWhere('article.title ILIKE :title', { title: `%${dto.filters.title}%` })
            }
            if (dto.filters.createdAt) {
                qb.andWhere('article.created_at = :publishedAt', { createdAt: dto.filters.createdAt })
            }
            if (dto.filters.authorId) {
                qb.andWhere('article.author_id = :authorId', { authorId: dto.filters.authorId })
            }
        }

        if (dto.query) {
            qb.andWhere('(article.title ILIKE :query OR article.content ILIKE :query)', { query: `%${dto.query}%` })
        }

        if (dto.sorts) {
            Object.entries(dto.sorts).forEach(([field, order]) => {
                qb.addOrderBy(`article.${field}`, order)
            })
        } else {
            qb.addOrderBy('article.createdAt', 'DESC')
        }

        const page = dto.pagination?.page || 1
        const count = dto.pagination?.count || 10
        qb.skip((page - 1) * count).take(count)

        const [items, total] = await qb.getManyAndCount()

        return {
            data: items,
            pagination: {
                total,
                page,
                count,
                totalPages: Math.ceil(total / count)
            }
        }
    }
}
