import { User } from './../../web-push/entities/user.entity';
import { Field } from 'src/web-push/entities/field.entity';

export class ResponseFieldDto {
  private readonly fieldId: number;

  private readonly userId: number;

  private readonly field: number;

  private readonly detailField: number;

  constructor(
    fieldId: number,
    userId: number,
    field: number,
    detailField: number,
  ) {
    this.fieldId = fieldId;
    this.field = field;
    this.userId = userId;
    this.detailField = detailField;
  }

  static from(field: Field): ResponseFieldDto {
    const user = field.User.id;
    return new ResponseFieldDto(
      field.id,
      user,
      field.field,
      field.detailedField,
    );
  }
}
