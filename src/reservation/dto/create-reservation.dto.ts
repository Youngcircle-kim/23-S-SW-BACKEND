import { Counselor } from 'src/web-push/entities/counselor.emtity';
import { User } from 'src/web-push/entities/user.entity';

export class CreateReservationDto {
  time: Date;

  User: User;

  Counselor: Counselor;
}
