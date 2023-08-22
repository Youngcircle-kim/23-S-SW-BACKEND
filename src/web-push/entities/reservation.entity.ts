import { BaseTimeEntity } from 'src/common/entities/BaseTimeEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('reservations')
export class Reservation extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  time: Date;

  @ManyToOne(() => User, (User) => User.studentReservationId)
  Student: User;

  @ManyToOne(() => User, (User) => User.CounselorReservationId)
  Counselor: User;

  static of(time: Date): Reservation {
    const reservation: Reservation = new Reservation();

    reservation.time = time;

    return reservation;
  }
}
