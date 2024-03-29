import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const config = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix(config.get('app.prefix'));

  if (config.get('app.env') !== 'production') {
    const documentBuilder = new DocumentBuilder()
      .setTitle('Teracube OTA')
      .setDescription('Teracube OTA API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup('docs', app, document);
  }

  const port = config.get('app.port');
  await app.listen(port);
  Logger.log(`App running on port: ${port}`, 'Bootstrap');
}
bootstrap();
