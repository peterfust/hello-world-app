import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLogger } from './winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLogger(),
  });

  await app.listen(3000);
  const logger = new WinstonLogger();
  const appUrl = await app.getUrl();
  logger.info(`Application is running on: ${appUrl}`);
}
bootstrap();
