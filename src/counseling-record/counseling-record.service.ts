import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCounselingRecordDto } from './dto/create-counseling-record.dto';
import { UpdateCounselingRecordDto } from './dto/update-counseling-record.dto';
import { CounselingRecord } from 'src/web-push/entities/counselingRecord.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseCounselingRecordDto } from './dto/response-counseling-record.dto';

@Injectable()
export class CounselingRecordService {
  constructor(
    @InjectRepository(CounselingRecord)
    private readonly counselingRecordRepository: Repository<CounselingRecord>,
  ) {}
  async create(createCounselingRecordDto: CreateCounselingRecordDto) {
    const newcounselingRecordnRepository: CounselingRecord =
      CounselingRecord.of(
        createCounselingRecordDto.comment,
        createCounselingRecordDto.Reservation,
      );
    try {
      const savedCounselingRecord = await this.counselingRecordRepository.save(
        newcounselingRecordnRepository,
      );

      return 'Success create new Field';
    } catch (err) {
      console.error(err);
      return 'Fail look at the console';
    }
  }

  async findAll() {
    const reservations: CounselingRecord[] =
      await this.counselingRecordRepository.find({
        relations: {
          Reservation: true,
        },
      });

    return reservations.map(ResponseCounselingRecordDto.from);
  }

  async findOne(id: number) {
    const updatecounselingRecord: CounselingRecord =
      await this.counselingRecordRepository.findOne({
        where: { id },
        relations: {
          Reservation: true,
        },
      });

    if (updatecounselingRecord === null) {
      throw new NotFoundException();
    }
    return ResponseCounselingRecordDto.from(updatecounselingRecord);
  }

  async update(
    id: number,
    updateCounselingRecordDto: UpdateCounselingRecordDto,
  ) {
    const updatecounselingRecord: CounselingRecord =
      await this.counselingRecordRepository.findOne({
        where: { id },
        relations: {
          Reservation: true,
        },
      });
    if (updateCounselingRecordDto.comment !== null) {
      updatecounselingRecord.comment = updateCounselingRecordDto.comment;
    }

    if (updateCounselingRecordDto.Reservation !== null) {
      updatecounselingRecord.Reservation =
        updateCounselingRecordDto.Reservation;
    }

    return `This action updates a #${id} counselingRecord`;
  }

  async remove(id: number) {
    const counselingRecord: CounselingRecord =
      await this.counselingRecordRepository.findOne({
        where: { id },
        relations: {
          Reservation: true,
        },
      });
    this.counselingRecordRepository.remove(counselingRecord);
    return `This action removes a #${id} counselingRecord`;
  }
}
