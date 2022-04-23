import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

function sweggerConfig (app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Calculator API')
    .setDescription('The Calculator API description')
    .setVersion('1.0')
    .addTag('calculator')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  sweggerConfig(app)
  await app.listen(port);
}

bootstrap();
