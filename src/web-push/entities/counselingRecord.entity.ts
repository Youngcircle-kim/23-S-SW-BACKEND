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
export class CounselingRecord extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column('text')
  indicator: string;

  @OneToOne((type) => Reservation)
  @JoinColumn()
  Reservation: Reservation;

  static of(
    comment: string,
    indicator: string,
    Reservation: Reservation,
  ): CounselingRecord {
    const counselingRecord: CounselingRecord = new CounselingRecord();

    counselingRecord.comment = comment;
    counselingRecord.indicator = indicator;
    counselingRecord.Reservation = Reservation;

    return counselingRecord;
  }
}
