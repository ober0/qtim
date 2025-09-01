import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PasswordService } from '../password/password.service'
import { UserRepository } from './user.repository'
import { RedisService } from '../redis/redis.service'
import { Cacheable } from '../../common/decorators/cache.decorator'
import { UserMessagePatterns } from './const/message-patterns.const'
import { TtlEnum } from 'src/common/enum/ttl.enum'
import { ClearCache } from '../../common/decorators/cache-clear.decorator'
import { UserResponseDto, UserResponseWithUserDto } from './dto/response.dto'
import { UserCreateDto } from './dto/create.dto'
import { SignInBaseDto } from '../auth/dto/signin.dto'

@Injectable()
export class UserService {
    constructor(
        private readonly repository: UserRepository,
        private readonly passwordService: PasswordService,
        private readonly redisService: RedisService
    ) {}

    async findOneByEmail(email: string): Promise<UserResponseDto | null> {
        return this.repository.findOneByEmail(email, false)
    }

    @Cacheable({
        keyPrefix: UserMessagePatterns.FIND_ONE_BY_ID,
        ttl: TtlEnum.THREE_HOUR,
        includedIndexes: [0]
    })
    async findOneById(id: string): Promise<UserResponseDto> {
        const user: UserResponseDto | null = await this.repository.findOneById(id)
        if (!user) throw new NotFoundException()
        return user
    }

    async create(dto: UserCreateDto): Promise<UserResponseDto> {
        return this.repository.create(dto)
    }

    async verify(dto: SignInBaseDto) {
        const user = (await this.repository.findOneByEmail(dto.email, true)) as UserResponseWithUserDto | null

        if (!user) throw new NotFoundException()

        const isPasswordValid = await this.passwordService.comparePassword(dto.password, user.password.password)
        if (!isPasswordValid) throw new ForbiddenException()

        return {
            id: user.id,
            email: user.email,
            password: user.password.password
        }
    }
}
