import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './common/pipe/validation.pipe';

import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.enableCors({ credentials: true, origin: [process.env.CLIENT_URL] });
    app.use(helmet());

    app.useGlobalPipes(
        new CustomValidationPipe({
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );
    app.use(cookieParser());

    await app.listen(4000);
    Logger.log(`Application is running`, bootstrap.name);
}
bootstrap();
