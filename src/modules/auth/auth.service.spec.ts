import { ConflictException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'
import { PasswordService } from '../password/password.service'
import { TokenService } from '../token/token.service'

describe('AuthService', () => {
    let service: AuthService
    let userService: jest.Mocked<UserService>
    let passwordService: jest.Mocked<PasswordService>
    let tokenService: jest.Mocked<TokenService>

    beforeEach(() => {
        userService = {
            findOneByEmail: jest.fn(),
            create: jest.fn(),
            verify: jest.fn()
        } as any

        passwordService = {
            hashPassword: jest.fn()
        } as any

        tokenService = {
            generateAccessToken: jest.fn(),
            generateRefreshToken: jest.fn(),
            verifyRefreshToken: jest.fn()
        } as any

        service = new AuthService(userService, passwordService, tokenService)
    })

    it('email занят', async () => {
        userService.findOneByEmail.mockResolvedValue({ id: '1' } as any)

        await expect(service.signup({ email: 'test@test.com', password: '123456' } as any)).rejects.toThrow(ConflictException)
    })

    it('signup: должен возвращать токены и юзера', async () => {
        userService.findOneByEmail.mockResolvedValue(null)
        passwordService.hashPassword.mockResolvedValue('hashed')
        userService.create.mockResolvedValue({ id: '1', email: 'test@test.com' } as any)
        tokenService.generateAccessToken.mockResolvedValue('access')
        tokenService.generateRefreshToken.mockResolvedValue('refresh')

        const res = await service.signup({ email: 'test@test.com', password: '123456' } as any)

        expect(res).toEqual({ id: '1', email: 'test@test.com', accessToken: 'access', refreshToken: 'refresh' })
    })

    it('signin: должен вернуть access и refresh токены', async () => {
        userService.verify.mockResolvedValue({ id: '1', email: 'test@test.com', password: 'hashed' })
        tokenService.generateAccessToken.mockResolvedValue('access')
        tokenService.generateRefreshToken.mockResolvedValue('refresh')

        const res = await service.signin({ email: 'test@test.com', password: '123456' } as any)

        expect(res).toEqual({ accessToken: 'access', refreshToken: 'refresh' })
    })

    it('refresh: должен обновлять токены', async () => {
        tokenService.verifyRefreshToken.mockResolvedValue({ id: '1' })
        tokenService.generateAccessToken.mockResolvedValue('access')
        tokenService.generateRefreshToken.mockResolvedValue('refresh')

        const res = await service.refresh({ refreshToken: 'oldRefresh' } as any)

        expect(res).toEqual({ accessToken: 'access', refreshToken: 'refresh' })
    })
})
