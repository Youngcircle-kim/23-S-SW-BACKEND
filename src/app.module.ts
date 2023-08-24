import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './common/config/typeorm.config.service';
import { EventsModule } from './events/events.module';
import { WebPushModule } from './web-push/web-push.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { FieldModule } from './field/field.module';
import { ReservationModule } from './reservation/reservation.module';
import { ResumeModule } from './resume/resume.module';
import { CounselingRecordModule } from './counseling-record/counseling-record.module';
import { CommentModule } from './comment/comment.module';
import { AiInterviewModule } from './ai-interview/ai-interview.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    EventsModule,
    WebPushModule,
    AuthModule,
    FieldModule,
    ReservationModule,
    ResumeModule,
    CounselingRecordModule,
    CommentModule,
    AiInterviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
