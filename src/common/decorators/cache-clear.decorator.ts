import { Logger } from '@nestjs/common'
import 'reflect-metadata'
import { RedisService } from '../../modules/redis/redis.service'

export class ClearCacheOptions {
    keyPrefix: string | string[]
}

const logger: Logger = new Logger('ClearCacheOptions')

async function deleteCache(redisService: RedisService, prefix: string) {
    const cacheKey = `cache:${prefix}:*`

    const cachedKeys: string[] = await redisService.scanKeysByPrefix(cacheKey)
    if (cachedKeys) {
        await redisService.del(cachedKeys)
        logger.log(`gateway Кэш для ${cachedKeys.length} ключей ${prefix} удален`)
    }
}

export function ClearCache(options: ClearCacheOptions) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value

        const wrappedMethod = async function (...args: any[]) {
            try {
                const redisService: RedisService = this.redisService

                const prefixes = Array.isArray(options.keyPrefix) ? options.keyPrefix : [options.keyPrefix]

                await Promise.all(prefixes.map((prefix) => deleteCache(redisService, prefix)))

                return await originalMethod.apply(this, args)
            } catch (err) {
                logger.warn('Не удалось выполнить запрос к redis')
                logger.error(err)
                return originalMethod.apply(this, args)
            }
        }

        const metadataKeys = Reflect.getMetadataKeys(originalMethod)
        for (const key of metadataKeys) {
            const value = Reflect.getMetadata(key, originalMethod)
            Reflect.defineMetadata(key, value, wrappedMethod)
        }

        descriptor.value = wrappedMethod
        return descriptor
    }
}
