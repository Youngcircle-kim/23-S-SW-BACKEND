import { Reservation } from './reservation.entity';
import { BaseTimeEntity } from 'src/common/entities/BaseTimeEntity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Resume } from './resume.entity';
import { Comment } from './comment.entity';
import { Counselor } from './counselor.entity';

@Entity({ name: 'users' })
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column('text')
  image: string;

  @Column()
  major: number;

  @Column({ nullable: true })
  clientToken: string;

  @OneToMany(() => Comment, (Comment) => Comment.User, { lazy: true })
  commentId: Comment[];

  @OneToMany(() => Resume, (Resume) => Resume.userId)
  resumeId: Resume[];

  @OneToMany(() => Reservation, (Reservation) => Reservation.userId)
  studentReservationId: Reservation[];

  @OneToOne(() => Counselor, (Counselor) => Counselor.User)
  CounselorId: Counselor;

  editUserInfo(dto) {
    this.image = dto.image;
    this.name = dto.name;
  }
  static of(
    name: string,
    email: string,
    password: string,
    image: string,
    major: number,
    clientToken: string,
  ): User {
    const user: User = new User();

    user.name = name;
    user.email = email;
    user.password = password;
    user.image = image;
    user.major = major;
    user.clientToken = clientToken;

    return user;
  }
}
