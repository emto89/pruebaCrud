import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');

  app.useGlobalPipes( new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions:{
      enableImplicitConversion: true,
    }
  }))

  const config = new DocumentBuilder()
  .setTitle('Pokemon RESTFul API')
  .setDescription('Documentacion de servicios pokemon')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
main();
