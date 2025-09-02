import { Injectable, NotFoundException } from '@nestjs/common'
import { ArticleCreateDto } from './dto/create'
import { ArticleRepository } from './article.repository'
import { ArticleResponseDto } from './dto/response'
import { UserBaseDto } from '../user/dto/base.dto'
import { Article } from '../../entities/article.entity'
import { ArticleSearchDto } from './dto/search'

@Injectable()
export class ArticleService {
    constructor(private readonly articleRepository: ArticleRepository) {}

    async create(dto: ArticleCreateDto, user: UserBaseDto): Promise<ArticleResponseDto> {
        return this.articleRepository.create(dto, user)
    }

    async update(dto: ArticleCreateDto, id: string) {
        await this.findOneById(id)
        return this.articleRepository.update(dto, id)
    }

    private async findOneById(id: string) {
        const article: Article | null = await this.articleRepository.findOneById(id)
        if (!article) throw new NotFoundException()
        return article
    }

    async delete(id: string) {
        await this.findOneById(id)
        const result = await this.articleRepository.delete(id)
        return {
            count: result.affected
        }
    }

    async search(dto: ArticleSearchDto) {
        return this.articleRepository.search(dto)
    }
}
