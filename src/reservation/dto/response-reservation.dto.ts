import { log } from 'console';
import { Reservation } from 'src/web-push/entities/reservation.entity';

export class ResponseReservationDto {
  private readonly id: number;

  private readonly UserId: number;

  private readonly counselorId: number;

  private readonly time: Date;

  constructor(id: number, UserId: number, counselorId: number, time: Date) {
    this.id = id;
    this.UserId = UserId;
    this.counselorId = counselorId;
    this.time = time;
  }

  static from(reservation: Reservation): ResponseReservationDto {
    const Student = reservation.userId.id;
    log(reservation.Counselor);
    const Counselor = reservation.Counselor.id;

    return new ResponseReservationDto(
      reservation.id,
      Student,
      Counselor,
      reservation.time,
    );
  }
}
