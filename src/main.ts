import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('port');
  await app.listen(port);
  Logger.log(`App running on port: ${port}`, 'Bootstrap');
}
bootstrap();
