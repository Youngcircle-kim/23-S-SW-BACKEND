import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Reservation } from './reservation.entity';
import { BaseTimeEntity } from 'src/common/entities/BaseTimeEntity';

@Entity({ name: 'counselors' })
export class Counselor extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (User) => User.CounselorId)
  User: User;

  @OneToMany(() => Reservation, (Reservation) => Reservation.counselorId)
  ReservationId: Reservation[];

  static of(User: User): Counselor {
    const counselor: Counselor = new Counselor();

    counselor.User = User;

    return counselor;
  }
}
