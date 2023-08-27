import { log } from 'console';
import { Counselor } from 'src/web-push/entities/counselor.entity';
import { Reservation } from 'src/web-push/entities/reservation.entity';
import { User } from 'src/web-push/entities/user.entity';

export class ResponseReservationDto {
  private readonly id: number;

  private readonly userId: number;

  private readonly counselorId: number;

  private readonly time: Date;

  constructor(id: number, userId: number, counselorId: number, time: Date) {
    this.id = id;
    this.userId = userId;
    this.counselorId = counselorId;
    this.time = time;
  }

  static from(reservation: Reservation): ResponseReservationDto {
    return new ResponseReservationDto(
      reservation.id,
      reservation.userId.id,
      reservation.counselorId.id,
      reservation.time,
    );
  }
}
