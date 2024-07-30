import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //   {
  //   origin: 'http://localhost:3000', // Permitir apenas este domínio
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  //   credentials: true, // Permitir envio de cookies
  // });
  await app.listen(3001);
}
bootstrap();
