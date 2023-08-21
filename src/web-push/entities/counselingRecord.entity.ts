import { BaseTimeEntity } from 'src/common/entities/BaseTimeEntity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity('counselingRecords')
export class CounselingReord extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  password: string;

  @OneToOne((type) => Reservation)
  @JoinColumn()
  Reservation: Reservation;

  static of(comment: string, password: string): CounselingReord {
    const counselingRecord: CounselingReord = new CounselingReord();

    counselingRecord.comment = comment;
    counselingRecord.password = password;

    return counselingRecord;
  }
}
