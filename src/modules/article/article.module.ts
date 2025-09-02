import { Module } from '@nestjs/common'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../entities/user.entity'
import { Person } from '../../entities/person.entity'
import { Password } from '../../entities/password.entity'
import { Article } from '../../entities/article.entity'
import { ArticleRepository } from './article.repository'

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    controllers: [ArticleController],
    providers: [ArticleService, ArticleRepository]
})
export class ArticleModule {}
