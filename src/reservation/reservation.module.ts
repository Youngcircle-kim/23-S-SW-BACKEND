import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from 'src/web-push/entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/web-push/entities/user.entity';
import { Counselor } from 'src/web-push/entities/counselor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Counselor, User, Reservation]),
    AuthModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
