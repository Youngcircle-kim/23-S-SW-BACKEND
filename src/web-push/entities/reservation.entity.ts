import { BaseTimeEntity } from 'src/common/entities/BaseTimeEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Counselor } from './counselor.entity';
import { log } from 'console';

@Entity('reservations')
export class Reservation extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  time: Date;

  @ManyToOne(() => User, (User) => User.studentReservationId)
  userId: User;

  @ManyToOne(() => Counselor, (Counselor) => Counselor.ReservationId)
  counselorId: Counselor;

  edit(dto) {
    this.userId = dto.userId;
    this.counselorId = dto.counselorId;
    this.time = dto.time;
  }

  static of(time: Date, Student: User, Counselor: Counselor): Reservation {
    const reservation: Reservation = new Reservation();

    reservation.time = time;
    reservation.userId = Student;
    reservation.counselorId = Counselor;

    return reservation;
  }
}
