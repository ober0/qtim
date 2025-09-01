import { Inject, Injectable, Logger } from '@nestjs/common'
import * as Redis from 'ioredis'

@Injectable()
export class RedisService {
    private readonly logger = new Logger(RedisService.name)

    constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis.Redis) {}

    async onModuleInit() {
        try {
            const keys = await this.redisClient.keys('cache:*')
            if (keys.length) {
                await this.redisClient.del(...keys)
                this.logger.log(`Удалено кэш-ключей из Redis: ${keys.length}`)
            } else {
                this.logger.log('Кэш-ключи в Redis не найдены.')
            }
        } catch (error) {
            this.logger.warn('Ошибка при очистке кэша Redis:', error)
        }
    }

    async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
        if (ttlSeconds) {
            await this.redisClient.set(key, value, 'EX', ttlSeconds)
        } else {
            await this.redisClient.set(key, value)
        }
    }

    async get(key: string): Promise<string | null> {
        return this.redisClient.get(key)
    }

    async del(key: string | string[]): Promise<number | number[]> {
        if (typeof key === 'string') {
            return this.redisClient.del(key)
        } else {
            const data: number[] = await Promise.all(key.map(async (key: string) => await this.redisClient.del(key)))
            return data
        }
    }

    async scanKeysByPrefix(prefix: string) {
        let cursor = '0'
        const foundKeys: string[] = []

        do {
            const [nextCursor, keys] = await this.redisClient.scan(cursor, 'MATCH', prefix, 'COUNT', 100)
            cursor = nextCursor
            foundKeys.push(...keys)
        } while (cursor !== '0')

        return foundKeys
    }
}
