import { DataSource } from 'typeorm'

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { User } from '../../entities/user.entity'
import { Person } from '../../entities/person.entity'
import { Password } from '../../entities/password.entity'

import * as dotenv from 'dotenv'
import { Article } from '../../entities/article.entity'

dotenv.config()
const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 'admin',
    database: process.env.DB_NAME || 'postgres',
    schema: process.env.DB_SCHEMA || 'public',
    entities: [User, Person, Password, Article],
    synchronize: process.env.DB_SYNC === 'true',
    migrations: ['src/migrations/*.ts'],
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
}

export default new DataSource(config)
