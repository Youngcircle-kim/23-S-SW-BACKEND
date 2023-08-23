import { User } from 'src/web-push/entities/user.entity';

export class CreateFieldDto {
  field: number;

  detailField: number;

  userId: User;
}
