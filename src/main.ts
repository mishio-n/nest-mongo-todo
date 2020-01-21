import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// for Hot Reload
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  app.useLogger(new Logger());
  app.useGlobalPipes(new ValidationPipe());

  // 別ドメインからのアクセスを許可する
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });

  // /api でリクエストをさばく
  app.setGlobalPrefix('api');

  // Swagger の設定
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Todo App')
    .setDescription('API description for Todo App')
    .setVersion('0.1')
    .addTag('todo')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);

  // for Hot Reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
}

bootstrap();
