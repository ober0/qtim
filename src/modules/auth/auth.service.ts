import { ConflictException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { PasswordService } from '../password/password.service'
import { TokenService } from '../token/token.service'
import { SignUpBaseDto, SignUpResponseDto } from './dto/singup.dto'
import { UserResponseDto } from '../user/dto/response.dto'
import { SignInBaseDto, SignInResponseDto } from './dto/signin.dto'
import { RefreshBaseDto } from './dto/refresh.dto'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly passwordService: PasswordService,
        private readonly tokenService: TokenService
    ) {}

    async signup(dto: SignUpBaseDto): Promise<SignUpResponseDto> {
        if (await this.userService.findOneByEmail(dto.email)) throw new ConflictException('Пользователь с данным email уже существует в системе')
        const hashedPassword: string = await this.passwordService.hashPassword(dto.password)

        const user: UserResponseDto = await this.userService.create({
            email: dto.email,
            firstName: dto.person?.firstName,
            lastName: dto.person?.lastName,
            patronymic: dto.person?.patronymic ? dto.person?.patronymic : undefined,
            password: hashedPassword
        })

        return {
            ...user,
            accessToken: await this.tokenService.generateAccessToken(user.id),
            refreshToken: await this.tokenService.generateRefreshToken(user.id)
        }
    }

    async signin(dto: SignInBaseDto): Promise<SignInResponseDto> {
        const user: {
            id: string
            email: string
            password: string
        } = await this.userService.verify(dto)

        return {
            accessToken: await this.tokenService.generateAccessToken(user.id),
            refreshToken: await this.tokenService.generateRefreshToken(user.id)
        }
    }

    async refresh(dto: RefreshBaseDto) {
        // @ts-ignore
        const { id }: { id: string } = await this.tokenService.verifyRefreshToken(dto.refreshToken)

        return {
            accessToken: await this.tokenService.generateAccessToken(id),
            refreshToken: await this.tokenService.generateRefreshToken(id)
        }
    }
}
