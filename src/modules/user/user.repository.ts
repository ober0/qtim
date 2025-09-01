import { Injectable } from '@nestjs/common'
import { UserCreateDto } from './dto/create.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../entities/user.entity'
import { Repository } from 'typeorm'
import { Person } from '../../entities/person.entity'
import { Password } from '../../entities/password.entity'

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,

        @InjectRepository(Person)
        private readonly personRepo: Repository<Person>,

        @InjectRepository(Password)
        private readonly passwordRepo: Repository<Password>
    ) {}

    async findOneByEmail(email: string, withPassword: boolean = false) {
        return this.repo.findOne({
            where: { email },
            relations: withPassword ? ['password', 'person'] : ['person']
        })
    }

    async findOneById(id: string) {
        return this.repo.findOne({
            where: { id },
            relations: ['person', 'password']
        })
    }

    async create(dto: UserCreateDto) {
        const user = this.repo.create({
            email: dto.email,
            person: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                patronymic: dto.patronymic
            },
            password: {
                password: dto.password
            }
        })

        return this.repo.save(user)
    }
}
