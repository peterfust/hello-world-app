import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLogger } from './winston.logger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLogger(),
  });

  await app.listen(3000);
  const logger = new Logger('Bootstrap');
  const appUrl = await app.getUrl();
  logger.log(`Application is running on: ${appUrl}`);
}
bootstrap();
