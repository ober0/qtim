import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { ArticleService } from './article.service'
import { ArticleCreateResponseDto, ArticleDeleteResponseDto, ArticleResponseDto, ArticleSearchResponseDto } from './dto/response'
import { ArticleCreateDto } from './dto/create'
import { DecodeUser } from '../../common/decorators/decode-user.decorator'
import { UserBaseDto } from '../user/dto/base.dto'
import { ArticleSearchDto } from './dto/search'

@Controller('article')
@ApiTags('Articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post()
    @ApiCreatedResponse({ type: ArticleCreateResponseDto })
    @ApiOperation({ summary: 'Создание статьи' })
    @ApiSecurity('bearer')
    @UseGuards(JwtAuthGuard)
    async create(@DecodeUser() user: UserBaseDto, @Body() dto: ArticleCreateDto): Promise<ArticleResponseDto> {
        return this.articleService.create(dto, user)
    }

    @Patch(':id')
    @ApiCreatedResponse({ type: ArticleResponseDto })
    @ApiOperation({ summary: 'Обновление статьи' })
    @ApiSecurity('bearer')
    @UseGuards(JwtAuthGuard)
    async update(@DecodeUser() user: UserBaseDto, @Param('id') id: string, @Body() dto: ArticleCreateDto) {
        return this.articleService.update(user, dto, id)
    }

    @Delete(':id')
    @ApiOkResponse({ type: ArticleDeleteResponseDto })
    @ApiOperation({ summary: 'Удалить статью' })
    @ApiSecurity('bearer')
    @UseGuards(JwtAuthGuard)
    async delete(@DecodeUser() user: UserBaseDto, @Param('id') id: string) {
        return this.articleService.delete(user, id)
    }

    @Post('search')
    @ApiOperation({ summary: 'Поиск по статьям' })
    @ApiOkResponse({ type: ArticleSearchResponseDto })
    @HttpCode(HttpStatus.OK)
    async search(@Body() dto: ArticleSearchDto): Promise<ArticleSearchResponseDto> {
        return this.articleService.search(dto)
    }
}
