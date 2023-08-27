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
  reservation: Reservation;

  edit(dto) {
    this.comment = dto.comment;
  }

  static of(
    comment: string,
    indicator: string,
    Reservation: Reservation,
  ): CounselingRecord {
    const counselingRecord: CounselingRecord = new CounselingRecord();
    counselingRecord.indicator = indicator;
    counselingRecord.comment = comment;
    counselingRecord.reservation = Reservation;

    return counselingRecord;
  }
}
