import { ArticleCreateDto } from './create'
import { PartialType } from '@nestjs/swagger'

export class ArticleUpdateDto extends PartialType(ArticleCreateDto) {}
