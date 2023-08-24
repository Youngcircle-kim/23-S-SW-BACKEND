import { Reservation } from 'src/web-push/entities/reservation.entity';

export class CreateCounselingRecordDto {
  comment: string;

  Reservation: Reservation;
}
