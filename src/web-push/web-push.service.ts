import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as admin from 'firebase-admin';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { error, log } from 'console';

@Injectable()
export class WebPushService {
  private tokens: string[] = [];
  private readonly fcm: admin.messaging.Messaging;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: configService.get<string>('FCM_PROJECT_ID'),
        clientEmail: configService.get<string>('FCM_CLIENT_EMAIL'),
        privateKey: configService
          .get<string>('FCM_PRIVATE_KEY')
          .replace(/\\n/g, '\n'),
      }),
    });

    this.fcm = admin.messaging();
  }

  async sendPushNotification(
    token: string,
    title: string,
    body: string,
  ): Promise<string> {
    //TODO
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

  @Cron('0,30 8-16 * * MON,TUE,WED,THU,FRI')
  async hadleAlarmByHour() {
    await this.findEmail(35);

    //reservation table을 이용해, 예약 걸린 userId 값을 얻는 logic

    const title = '면접을 부탁해';
    const body = '30분뒤 면접이 있습니다.';

    try {
      this.tokens.forEach(async (token) => {
        await this.sendPushNotification(token, title, body);
      });
    } catch (err) {
      error(err);
    }
  }

  @Cron('0 0 18 * SUN,MON,TUE,WED,THU')
  async hadleAlarmByDay() {
    await this.findEmail(24 * 60);
    //reservation table을 이용해, 예약 걸린 userId 값을 얻는 logic
    const title = '면접을 부탁해';
    const body = '다음날 면접 예약이 잡혀있습니다.';

    try {
      this.tokens.forEach(async (token) => {
        await this.sendPushNotification(token, title, body);
      });
    } catch (err) {
      error(err);
    }
  }

  async findEmail(time: number) {
    this.tokens.length = 0;

    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + time * 60 * 1000);

    const studentIds = await this.reservationRepository
      .createQueryBuilder('reservation')
      .select('reservation.studentId', 'studentId')
      .where('reservation.time >= :currentTime', { currentTime })
      .andWhere('reservation.time <= :endTime', { endTime })
      .getRawMany();

    const userEmails = await this.userRepository
      .createQueryBuilder('user')
      .select('user.clientToken', 'clientToken')
      .whereInIds(studentIds.map((entry) => entry.studentId))
      .getRawMany();

    const counselorIds = await this.reservationRepository
      .createQueryBuilder('reservation')
      .select('reservation.counselorId', 'counselorId')
      .where('reservation.time >= :currentTime', { currentTime })
      .andWhere('reservation.time <= :endTime', { endTime })
      .getRawMany();

    const counselorEmails = await this.userRepository
      .createQueryBuilder('user')
      .select('user.clientToken', 'clientToken')
      .whereInIds(counselorIds.map((entry) => entry.counselorId))
      .getRawMany();

    userEmails.forEach((token) => {
      this.tokens.push(token.clientToken);
    });

    counselorEmails.forEach((token) => {
      this.tokens.push(token.clientToken);
    });

    this.tokens = Array.from(new Set(this.tokens));
    log(this.tokens);
  }
}
