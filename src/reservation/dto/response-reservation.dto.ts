import { log } from 'console';
import { Reservation } from 'src/web-push/entities/reservation.entity';

export class ResponseReservationDto {
  private readonly id: number;

  private readonly studentId: number;

  private readonly counselorId: number;

  private readonly time: Date;

  constructor(id: number, studentId: number, counselorId: number, time: Date) {
    this.id = id;
    this.studentId = studentId;
    this.counselorId = counselorId;
    this.time = time;
  }

  static from(reservation: Reservation): ResponseReservationDto {
    const Student = reservation.Student.id;
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
