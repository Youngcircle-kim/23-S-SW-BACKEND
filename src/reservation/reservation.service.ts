import { User } from './../web-push/entities/user.entity';
import { Counselor } from 'src/web-push/entities/counselor.entity';
import { Reservation } from './../web-push/entities/reservation.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseReservationDto } from './dto/response-reservation.dto';
import { log } from 'console';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}
  async create(createReservationDto: CreateReservationDto) {
    const newReservation: Reservation = Reservation.of(
      createReservationDto.time,
      createReservationDto.userId,
      createReservationDto.counselorId,
    );
    try {
      const savedReservation = await this.reservationRepository.save(
        newReservation,
      );

      return 'Success create new Field';
    } catch (err) {
      console.error(err);
      return 'Fail look at the console';
    }
  }

  async findOne(id: number) {
    const reservation: Reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: {
        userId: true,
        counselorId: true,
      },
    });

    return ResponseReservationDto.from(reservation);
  }

  async findAll(id: number) {
    const reservations: Reservation[] = await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.userId = :id', { id })
      .getMany();

    if (reservations === null) {
      throw new NotFoundException();
    }
    return reservations.map(ResponseReservationDto.from);
  }

  async update(updateReservationDto: UpdateReservationDto) {
    try {
      const id = updateReservationDto.reservationId;

      const reservation: Reservation = await this.reservationRepository.findOne(
        {
          where: { id },
          relations: {
            userId: true,
            counselorId: true,
          },
        },
      );

      reservation.edit(updateReservationDto);

      await this.reservationRepository.save(reservation);
      return { message: '성공' };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: number) {
    try {
      const reservation: Reservation = await this.reservationRepository.findOne(
        {
          where: { id },
        },
      );
      this.reservationRepository.remove(reservation);
      return { message: '성공' };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
