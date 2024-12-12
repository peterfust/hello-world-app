import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { WinstonLogger } from './winston.logger';
import { setTimeout } from 'timers/promises';


@Controller()
export class AppController {
  private readonly logger = new WinstonLogger();
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  async getHello(): Promise<string> {
    this.logger.info('GetHello 1 call');
    await setTimeout(10000);
    this.logger.info('GetHello 2 call');
    return this.appService.getHello();
  }
}
