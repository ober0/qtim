import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UserInclude, UserWithPasswordInclude } from './const/include.const'
import { UserCreateDto } from './dto/create.dto'
import { UserResponseDto, UserResponseWithUserDto } from './dto/response.dto'

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findOneByEmail(email: string, withPassword: boolean = false) {
        return this.prisma.user.findUnique({
            where: { email },
            ...(withPassword ? UserWithPasswordInclude : UserInclude)
        })
    }

    async findOneById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            ...UserInclude
        })
    }

    async create(dto: UserCreateDto): Promise<UserResponseDto> {
        return this.prisma.user.create({
            data: {
                email: dto.email,
                password: {
                    create: {
                        password: dto.password
                    }
                },
                person: {
                    create: {
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                        patronymic: dto?.patronymic
                    }
                }
            },
            ...UserInclude
        })
    }
}
