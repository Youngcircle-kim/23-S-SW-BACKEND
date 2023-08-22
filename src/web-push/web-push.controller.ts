import { Post, Body, Controller } from '@nestjs/common';
import { WebPushService } from './web-push.service';

@Controller()
export class WebPushController {
  constructor(private readonly fcmService: WebPushService) {}

  @Post('send-notification')
  async sendPushNotification(
    @Body('token') token: string,
    @Body('title') title: string,
    @Body('body') body: string,
  ): Promise<string> {
    return this.fcmService.sendPushNotification(token, title, body);
  }
}
