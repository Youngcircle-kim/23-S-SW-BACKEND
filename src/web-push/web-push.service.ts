import { Injectable } from '@nestjs/common';
import * as webpush from 'web-push';
import { error } from 'console';

@Injectable()
export class WebPushService {
  async sendNotfication(subscription: any) {
    const payload = JSON.stringify({ title: 'Push Test' });
    try {
      await webpush.sendNotification(subscription, payload);
    } catch (err) {
      error(err);
    }
  }
}
