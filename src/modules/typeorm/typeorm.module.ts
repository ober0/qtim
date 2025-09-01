import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeormConfig } from './typeorm.config'

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: TypeormConfig
        })
    ]
})
export class TypeormModule {}
