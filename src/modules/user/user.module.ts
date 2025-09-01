import { forwardRef, Global, Module } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthModule } from '../auth/auth.module'
import { PasswordModule } from '../password/password.module'
import { UserRepository } from './user.repository'
import { PrismaModule } from '../prisma/prisma.module'
import { RedisModule } from '../redis/redis.module'
import { UserController } from './user.controller'

@Global()
@Module({
    imports: [forwardRef(() => AuthModule), PasswordModule, PrismaModule, PasswordModule, RedisModule],
    providers: [UserService, UserRepository],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
