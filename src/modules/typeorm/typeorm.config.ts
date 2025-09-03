import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Person } from '../../entities/person.entity'
import { User } from '../../entities/user.entity'
import { Password } from '../../entities/password.entity'
import * as dotenv from 'dotenv'
import { Article } from '../../entities/article.entity'

dotenv.config()
export const TypeormConfig = (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 'admin',
    database: process.env.DB_NAME || 'postgres',
    schema: process.env.DB_SCHEMA || 'public',
    entities: [User, Person, Password, Article],
    autoLoadEntities: true,
    synchronize: process.env.DB_SYNC === 'true',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
})
