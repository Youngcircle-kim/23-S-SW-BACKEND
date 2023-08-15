import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './appointments/appointments.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './common/config/typeorm.config.service';
import { EventsModule } from './events/events.module';
import { WebPushModule } from './web-push/web-push.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AppointmentsModule,
    EventsModule,
    WebPushModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
