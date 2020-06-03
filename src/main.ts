import {
  NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Account')

  // Build swagger docs for development
  const options = new DocumentBuilder()
    .setTitle('Accounts service')
    .setDescription('Accounts service API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    disableErrorMessages: false,
  }))
  // Initialize global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: process.env.USER_SERVICE_HOST,
      port: parseInt(
        process.env.USER_SERVICE_PORT
        ,10)
    }
  });

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: process.env.AUTH_SERVICE_HOST,
      port: parseInt(
        process.env.AUTH_SERVICE_PORT
        ,10)
    }
  });

  await app.startAllMicroservicesAsync();

  await app.listen(process.env.PORT);
  logger.log(`Service is running on http://localhost:${process.env.PORT}`);
}
bootstrap();
