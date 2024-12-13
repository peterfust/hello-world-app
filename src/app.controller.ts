import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { setTimeout } from 'timers/promises';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  async getHello(): Promise<string> {
    this.logger.log('GetHello 1 call');
    await setTimeout(10000);
    this.logger.log('GetHello 2 call');
    return this.appService.getHello();
  }
}
