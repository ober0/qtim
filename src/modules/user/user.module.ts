import { forwardRef, Global, Module } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthModule } from '../auth/auth.module'
import { PasswordModule } from '../password/password.module'
import { UserRepository } from './user.repository'
import { RedisModule } from '../redis/redis.module'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../entities/user.entity'
import { Person } from '../../entities/person.entity'
import { Password } from '../../entities/password.entity'

@Global()
@Module({
    imports: [forwardRef(() => AuthModule), PasswordModule, TypeOrmModule.forFeature([User, Person, Password])],
    providers: [UserService, UserRepository],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
