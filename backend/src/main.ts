import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger : ["debug", "error", "log", "verbose", "warn"],
  });
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser())

  app.enableCors(
    {
      credentials : true
    })

  await app.listen(5000);
}
bootstrap();


