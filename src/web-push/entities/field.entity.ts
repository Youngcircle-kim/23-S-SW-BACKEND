import { BaseTimeEntity } from 'src/common/entities/BaseTimeEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('fields')
export class Field extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  field: number;

  @Column()
  detailedField: number;

  @ManyToOne(() => User, (User) => User.fieldId)
  user: User;

  editField(field: number): void {
    this.field = field;
  }

  editDetailedField(detailedField: number): void {
    this.detailedField = detailedField;
  }

  static of(fields: number, detailedField: number, user: User): Field {
    const field: Field = new Field();

    field.field = fields;
    field.detailedField = detailedField;
    field.user = user;

    return field;
  }
}
