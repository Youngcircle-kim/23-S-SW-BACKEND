import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

@Injectable()
export class WebPushService {
  private readonly fcm: admin.messaging.Messaging;
  constructor() {
    admin.initializeApp({
      credential: applicationDefault(),
    });

    this.fcm = admin.messaging();
  }

  async sendPushNotification(
    token: string,
    title: string,
    body: string,
  ): Promise<string> {
    const message: admin.messaging.Message = {
      token,
      notification: {
        title,
        body,
      },
    };

    try {
      const response = await this.fcm.send(message);
      return `Notification sent successfully: ${response}`;
    } catch (error) {
      return `Error sending notification: ${error}`;
    }
  }
}
