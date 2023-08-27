import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
        createCounselingRecordDto.indicator,
        createCounselingRecordDto.reservationId,
      );
    try {
      await this.counselingRecordRepository.save(
        newcounselingRecordnRepository,
      );

      return { message: '성공' };
    } catch (err) {
      console.error(err);
      throw new BadRequestException();
    }
  }

  async findAll() {
    const reservations: CounselingRecord[] =
      await this.counselingRecordRepository.find({
        relations: {
          reservation: true,
        },
      });

    return reservations.map(ResponseCounselingRecordDto.from);
  }

  async findOne(id: number) {
    const counselingRecord: CounselingRecord =
      await this.counselingRecordRepository.findOne({
        where: { id },
        relations: {
          reservation: true,
        },
      });

    if (counselingRecord === null) {
      throw new NotFoundException();
    }
    return ResponseCounselingRecordDto.from(counselingRecord);
  }

  async update(
    id: number,
    updateCounselingRecordDto: UpdateCounselingRecordDto,
  ) {
    try {
      const updatecounselingRecord: CounselingRecord =
        await this.counselingRecordRepository.findOne({
          where: { id },
          relations: {
            reservation: true,
          },
        });

      updatecounselingRecord.edit(updateCounselingRecordDto);

      await this.counselingRecordRepository.save(updatecounselingRecord);

      return { message: '성공' };
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async remove(id: number) {
    try {
      const counselingRecord: CounselingRecord =
        await this.counselingRecordRepository.findOne({
          where: { id },
          relations: {
            reservation: true,
          },
        });
      this.counselingRecordRepository.remove(counselingRecord);
      return { message: '성공' };
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
