import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@infra/upload/firebase/firebase.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  initializeApp(firebaseConfig);

  await app.listen(10000);
}
bootstrap();
