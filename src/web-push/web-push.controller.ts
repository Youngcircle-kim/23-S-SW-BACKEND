import { Post, Body, Controller, HttpStatus } from '@nestjs/common';
import { WebPushService } from './web-push.service';

@Controller()
export class WebPushController {
  constructor(private readonly webPushService: WebPushService) {}

  @Post('/subscribe')
  async subscribe(@Body() subscription: any) {
    await this.webPushService.sendNotfication(subscription);

    return { status: HttpStatus.CREATED };
  }
}
