import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    app.setGlobalPrefix('api')
    app.useGlobalPipes(new ValidationPipe())
    app.set('trust proxy', true)

    app.enableCors({
        origin: true,
        credentials: true
    })

    const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('Документация для API qtim')
        .setVersion('0.1')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header'
        })
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
