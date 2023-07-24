import { IsEmail } from 'class-validator';
import { BaseTimeEntity } from 'src/common/entities/BaseTimeEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  major: number;

  @Column()
  field: number;

  @Column()
  detailField: number;

  static of(
    email: string,
    password: string,
    major: number,
    field: number,
    detailField: number,
  ): User {
    const user: User = new User();

    user.email = email;
    user.password = password;
    user.major = major;
    user.field = field;
    user.detailField = detailField;

    return user;
  }
}
