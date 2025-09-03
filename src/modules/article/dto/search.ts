import { IsUUID, IsString, IsNotEmpty, MaxLength, IsDate, ValidateNested, IsOptional, IsEnum } from 'class-validator'
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { UserBaseDto } from '../../user/dto/base.dto'
import { SearchBaseDto } from '../../../common/dto/base-search.dto'
import { ArticleBaseDto } from './base'
import { SortTypes } from '../../../common/dto/sort-types.dto'

export class ArticleFilterDto extends PartialType(OmitType(ArticleBaseDto, ['id', 'author', 'content'])) {}

export class ArticleSortDto {
    @ApiProperty({ enum: SortTypes })
    @IsEnum(SortTypes)
    createdAt: SortTypes

    @ApiProperty({ enum: SortTypes })
    @IsEnum(SortTypes)
    authorId: SortTypes
}

export class ArticleSearchDto extends SearchBaseDto<ArticleFilterDto, ArticleSortDto> {
    @ApiProperty({ type: ArticleFilterDto })
    @ValidateNested()
    @Type(() => ArticleFilterDto)
    declare filters: ArticleFilterDto

    @ApiProperty({ type: ArticleSortDto })
    @ValidateNested()
    @Type(() => ArticleSortDto)
    declare sorts: ArticleSortDto
}
