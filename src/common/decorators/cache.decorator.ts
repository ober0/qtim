import { Logger } from '@nestjs/common'
import 'reflect-metadata'
import { RedisService } from '../../modules/redis/redis.service'

export class CacheableOptions {
    keyPrefix: string
    ttl?: number
    includedIndexes?: number[]
}

const logger: Logger = new Logger(CacheableOptions.name)

export function Cacheable(options: CacheableOptions) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value

        const wrappedMethod = async function (...args: any[]) {
            try {
                const redisService: RedisService = this.redisService

                let acceptedArgs: any[] = args
                if (options.includedIndexes) {
                    acceptedArgs = args.filter((item, index) => options.includedIndexes?.includes(index))
                }

                const keySuffix = JSON.stringify(acceptedArgs)
                const cacheKey = `cache:${options.keyPrefix}:${keySuffix}`

                const cached = await redisService.get(cacheKey)
                if (cached) {
                    logger.log(`Данные по ключу ${cacheKey} найдены в кэше gateway`)
                    return JSON.parse(cached)
                }

                const result = await originalMethod.apply(this, args)
                await redisService.set(cacheKey, JSON.stringify(result), options.ttl ?? 3600)
                return result
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
