import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthRepository } from './auth.repository'
import { PasswordModule } from '../password/password.module'
import { TokenModule } from '../token/token.module'

@Module({
    imports: [PasswordModule, TokenModule],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository],
    exports: [AuthService, AuthRepository]
})
export class AuthModule {}
