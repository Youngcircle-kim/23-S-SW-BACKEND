import { BaseTimeEntity } from 'src/common/entities/BaseTimeEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Counselor } from './counselor.emtity';

@Entity('reservations')
export class Reservation extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  time: Date;

  @ManyToOne(() => User, (User) => User.studentReservationId)
  User: User;

  @ManyToOne(() => Counselor, (Counselor) => Counselor.ReservationId)
  Counselor: Counselor;

  editTime(time: Date) {
    this.time = time;
  }

  editStudent(Student: User) {
    this.User = Student;
  }

  editCounselor(Counselor: Counselor) {
    this.Counselor = Counselor;
  }

  static of(time: Date, Student: User, Counselor: Counselor): Reservation {
    const reservation: Reservation = new Reservation();

    reservation.time = time;
    reservation.User = Student;
    reservation.Counselor = Counselor;

    return reservation;
  }
}
