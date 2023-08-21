import { Reservation } from './reservation.entity';
import { BaseTimeEntity } from 'src/common/entities/BaseTimeEntity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Resume } from './resume.entity';
import { Field } from './field.entity';
import { Comment } from './comment.entity';

@Entity({ name: 'users' })
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  position: boolean;

  @Column()
  major: number;

  @OneToMany(() => Comment, (Comment) => Comment.User, { lazy: true })
  commentId: Comment;

  @OneToMany(() => Resume, (Resume) => Resume.User, { lazy: true })
  resumeId: Resume;

  @OneToMany(() => Field, (Field) => Field.User, { lazy: true })
  fieldId: Field;

  @OneToMany(() => Reservation, (Reservation) => Reservation.Student)
  studentReservationId: Reservation[];

  @OneToMany(() => Reservation, (Reservation) => Reservation.Counselor)
  CounselorReservationId: Reservation[];

  static of(
    email: string,
    password: string,
    position: boolean,
    major: number,
  ): User {
    const user: User = new User();

    user.email = email;
    user.password = password;
    user.position = position;
    user.major = major;

    return user;
  }
}
