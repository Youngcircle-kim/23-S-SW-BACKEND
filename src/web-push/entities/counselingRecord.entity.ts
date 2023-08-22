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

  @Column('text')
  indicator: string;

  @OneToOne((type) => Reservation)
  @JoinColumn()
  Reservation: Reservation;

  static of(comment: string, indicator: string): CounselingReord {
    const counselingRecord: CounselingReord = new CounselingReord();

    counselingRecord.comment = comment;
    counselingRecord.indicator = indicator;

    return counselingRecord;
  }
}
