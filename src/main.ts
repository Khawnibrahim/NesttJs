import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Masked Chat API')
    .setDescription('API for masked client-developer chat system developed by khawni')
    .setVersion('1.0')
    .addTag('chat')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
  console.log('Swagger UI available at http://localhost:3000/swagger');
}
bootstrap();
