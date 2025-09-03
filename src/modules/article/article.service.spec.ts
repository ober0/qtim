import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleRepository } from './article.repository'
import { ArticleCreateDto } from './dto/create'
import { User } from '../../entities/user.entity'

describe('ArticleService', () => {
    let service: ArticleService
    let repository: jest.Mocked<ArticleRepository>

    const mockUser: User = {
        id: 'user-1',
        email: 'test@test.com',
        frontendId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        passwordId: 'pass-1',
        personId: 'person-1',
        password: null as any,
        person: null as any,
        articles: []
    }

    beforeEach(() => {
        repository = {
            create: jest.fn(),
            findOneById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            search: jest.fn()
        } as any

        service = new ArticleService(repository)
    })

    it('create: создание', async () => {
        const dto: ArticleCreateDto = { title: 'Title', content: 'Content' }
        const article = { ...dto, authorId: mockUser.id }
        repository.create.mockResolvedValue(article as any)

        const result = await service.create(dto, mockUser)
        expect(repository.create).toHaveBeenCalledWith(dto, mockUser)
        expect(result).toEqual(article)
    })

    it('update: ошибка если пользователь не автор', async () => {
        const dto: ArticleCreateDto = { title: 'New', content: 'New content' }
        repository.findOneById.mockResolvedValue({ id: '1', authorId: 'other-user' } as any)

        await expect(service.update(mockUser, dto, '1')).rejects.toThrow(ForbiddenException)
    })

    it('update: ошибка если статьи нет', async () => {
        const dto: ArticleCreateDto = { title: 'New', content: 'New content' }
        repository.findOneById.mockResolvedValue(null)

        await expect(service.update(mockUser, dto, '1')).rejects.toThrow(NotFoundException)
    })

    it('update: обновляет статью', async () => {
        const dto: ArticleCreateDto = { title: 'Updated', content: 'Updated content' }
        const article = { id: '1', authorId: mockUser.id }
        repository.findOneById.mockResolvedValue(article as any)
        repository.update.mockResolvedValue({ ...article, ...dto } as any)

        const result = await service.update(mockUser, dto, '1')
        expect(repository.update).toHaveBeenCalledWith(dto, '1')
        expect(result).toEqual({ ...article, ...dto })
    })

    it('delete: юзер не автор', async () => {
        repository.findOneById.mockResolvedValue({ id: '1', authorId: 'other-user' } as any)
        await expect(service.delete(mockUser, '1')).rejects.toThrow(ForbiddenException)
    })

    it('delete: удаляет статью', async () => {
        repository.findOneById.mockResolvedValue({ id: '1', authorId: mockUser.id } as any)
        repository.delete.mockResolvedValue({ affected: 1 } as any)

        const result = await service.delete(mockUser, '1')
        expect(result).toEqual({ count: 1 })
    })

    it('search: результат поиска', async () => {
        const dto = { query: 'test', filters: {} }
        const data = { data: [], pagination: { total: 0, page: 1, count: 10, totalPages: 0 } }
        repository.search.mockResolvedValue(data as any)

        const result = await service.search(dto as any)
        expect(result).toEqual(data)
        expect(repository.search).toHaveBeenCalledWith(dto)
    })
})
