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
  private map: Map<string, string[]> = new Map();
  private emails: string[] = [];
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

  async saveClientToken(token: string, userId: string): Promise<string> {
    // TODO
    // MAP에 token, user id 저장하는 logic
    if (this.map.get(userId)) {
      this.tokens = this.map.get(userId);
    }
    this.tokens.push(token);

    this.map.set(userId, this.tokens);
    this.map.forEach((val, key, mapObject) => {
      console.log(`${val} , ${key}`);
    });
    this.tokens = [];
    return 'success';
  }

  @Cron('0,30 8-16 * * MON,TUE,WED,THU,FRI')
  async hadleAlarmByHour() {
    this.findEmail(35);

    //reservation table을 이용해, 예약 걸린 userId 값을 얻는 logic

    const title = '면접을 부탁해';
    const body = '30분뒤 면접이 있습니다.';

    try {
      this.emails.forEach((userId) => {
        this.map.get(userId).forEach(async (val) => {
          await this.sendPushNotification(val, title, body);
        });
      });
    } catch (err) {
      error(err);
    }
  }

  @Cron('0 18 * SUN,MON,TUE,WED,THU')
  hadleAlarmByDay() {
    this.findEmail(24 * 60);
    //reservation table을 이용해, 예약 걸린 userId 값을 얻는 logic
    const title = '면접을 부탁해';
    const body = '다음날 면접 예약이 잡혀있습니다.';

    try {
      this.emails.forEach((userId) => {
        this.map.get(userId).forEach(async (val) => {
          await this.sendPushNotification(val, title, body);
        });
      });
    } catch (err) {
      error(err);
    }
  }

  async findEmail(time: number) {
    this.emails.length = 0;

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
      .select('user.email', 'email')
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
      .select('user.email', 'email')
      .whereInIds(counselorIds.map((entry) => entry.counselorId))
      .getRawMany();

    userEmails.forEach((email) => {
      this.emails.push(email.email);
    });

    counselorEmails.forEach((email) => {
      this.emails.push(email.email);
    });

    this.emails = Array.from(new Set(this.emails));

    log(this.emails);
  }
}
