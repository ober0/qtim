import { OmitType } from '@nestjs/swagger'
import { ArticleBaseDto } from './base'

export class ArticleCreateDto extends OmitType(ArticleBaseDto, ['author', 'authorId', 'createdAt', 'updatedAt', 'id']) {}
