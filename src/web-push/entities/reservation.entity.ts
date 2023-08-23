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

  editTime(time: Date) {
    this.time = time;
  }

  editStudent(Student: User) {
    this.Student = Student;
  }

  editCounselor(Counselor: User) {
    this.Counselor = Counselor;
  }

  static of(time: Date, Student: User, Counselor: User): Reservation {
    const reservation: Reservation = new Reservation();

    reservation.time = time;
    reservation.Student = Student;
    reservation.Counselor = Counselor;

    return reservation;
  }
}
