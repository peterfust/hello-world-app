import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';
import { LogInterceptor } from './interceptors/log.interceptor';

@Injectable()
export class WinstonLogger {
  private readonly logger: winston.Logger;

  constructor() {
    const logDir = path.join(process.cwd(), 'logs');

    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf(({ timestamp, level, message }) => {
          const requestId = LogInterceptor.getRequestId();
          return JSON.stringify({
            timestamp,
            level,
            message,
            requestId,
          });
        }),
      ),
      transports: [
        new winston.transports.File({
          filename: 'application.log',
          dirname: logDir,
        }),
      ],
    });

    if (process.env.NODE_ENV !== 'production') {
      // APP_ENV is accessed from env file
      this.logger.add(new winston.transports.Console());
    }
  }

  error(message: string, trace?: string) {
    this.logger.error(`${message} - ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  info(message: string) {
    this.logger.info(message);
  }
}
