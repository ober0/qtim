import { NotFoundException, ForbiddenException } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'
import { PasswordService } from '../password/password.service'
import { RedisService } from '../redis/redis.service'

describe('UserService', () => {
    let service: UserService
    let repository: jest.Mocked<UserRepository>
    let passwordService: jest.Mocked<PasswordService>
    let redisService: jest.Mocked<RedisService>

    beforeEach(() => {
        repository = {
            findOneByEmail: jest.fn(),
            findOneById: jest.fn(),
            create: jest.fn()
        } as any

        passwordService = {
            comparePassword: jest.fn()
        } as any

        redisService = {
            get: jest.fn().mockResolvedValue(null),
            set: jest.fn().mockResolvedValue(null),
            del: jest.fn().mockResolvedValue(null)
        } as any

        service = new UserService(repository, passwordService, redisService)
    })

    it('findOneByEmail: должен вызывать repository.findOneByEmail', async () => {
        repository.findOneByEmail.mockResolvedValue({ id: '1', email: 'test@test.com' } as any)

        const res = await service.findOneByEmail('test@test.com')

        expect(repository.findOneByEmail).toHaveBeenCalledWith('test@test.com', false)
        expect(res).toEqual({ id: '1', email: 'test@test.com' })
    })

    it('findOneById: должен вернуть пользователя', async () => {
        repository.findOneById.mockResolvedValue({ id: '1', email: 'test@test.com' } as any)

        const res = await service.findOneById('1')

        expect(repository.findOneById).toHaveBeenCalledWith('1')
        expect(res).toEqual({ id: '1', email: 'test@test.com' })
    })

    it('findOneById: пользователя нет', async () => {
        repository.findOneById.mockResolvedValue(null)

        await expect(service.findOneById('1')).rejects.toThrow(NotFoundException)
    })

    it('create: должен вызывать repository.create', async () => {
        repository.create.mockResolvedValue({ id: '1', email: 'test@test.com' } as any)

        const res = await service.create({ email: 'test@test.com', password: '123456' } as any)

        expect(repository.create).toHaveBeenCalledWith({ email: 'test@test.com', password: '123456' })
        expect(res).toEqual({ id: '1', email: 'test@test.com' })
    })

    it('verify: данные верны', async () => {
        repository.findOneByEmail.mockResolvedValue({
            id: '1',
            email: 'test@test.com',
            password: { password: 'hashed' }
        } as any)

        passwordService.comparePassword.mockResolvedValue(true)

        const res = await service.verify({ email: 'test@test.com', password: '123456' })

        expect(repository.findOneByEmail).toHaveBeenCalledWith('test@test.com', true)
        expect(passwordService.comparePassword).toHaveBeenCalledWith('123456', 'hashed')
        expect(res).toEqual({ id: '1', email: 'test@test.com', password: 'hashed' })
    })

    it('user не найден', async () => {
        repository.findOneByEmail.mockResolvedValue(null)

        await expect(service.verify({ email: 'test@test.com', password: '123456' })).rejects.toThrow(NotFoundException)
    })

    it('пароль неверный', async () => {
        repository.findOneByEmail.mockResolvedValue({
            id: '1',
            email: 'test@test.com',
            password: { password: 'hashed' }
        } as any)

        passwordService.comparePassword.mockResolvedValue(false)

        await expect(service.verify({ email: 'test@test.com', password: 'wrong' })).rejects.toThrow(ForbiddenException)
    })
})
