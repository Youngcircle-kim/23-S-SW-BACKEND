import { User } from 'src/web-push/entities/user.entity';

export class CreateReservationDto {
  time: Date;

  Student: User;

  Counselor: User;
}
