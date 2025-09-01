import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { RedisModule } from '../redis/redis.module'
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware'
import { ConfigModule } from '@nestjs/config'
import { PasswordModule } from '../password/password.module'
import { AuthModule } from '../auth/auth.module'
import { TokenModule } from '../token/token.module'
import { UserModule } from '../user/user.module'
import { TypeormModule } from '../typeorm/typeorm.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeormModule,
        RedisModule,
        PasswordModule,
        AuthModule,
        TokenModule,
        UserModule
    ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*path')
    }
}
