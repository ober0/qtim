import { IsNumber, IsOptional, ValidateNested } from 'class-validator'
import { ArticleBaseDto } from './base'
import { ApiProperty, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { PaginationDto, PaginationResponseDto } from '../../../common/dto/pagination.dto'

export class ArticleResponseDto extends ArticleBaseDto {}

export class ArticleDeleteResponseDto {
    @ApiProperty({ type: Number })
    @IsNumber()
    @IsOptional()
    count?: number | null
}

export class ArticleSearchResponseDto {
    @ApiProperty({ type: [ArticleResponseDto] })
    @ValidateNested()
    @Type(() => ArticleResponseDto)
    data: ArticleResponseDto[]

    @ApiProperty({ type: PaginationResponseDto })
    @ValidateNested()
    @Type(() => PaginationResponseDto)
    pagination?: PaginationResponseDto
}

export class ArticleCreateResponseDto extends OmitType(ArticleResponseDto, ['author']) {}
