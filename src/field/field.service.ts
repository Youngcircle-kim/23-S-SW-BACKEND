import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Field } from 'src/web-push/entities/field.entity';
import { Repository } from 'typeorm';
import { ResponseFieldDto } from './dto/response-field.dto';

@Injectable()
export class FieldService {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
  ) {}

  async create(createFieldDto: CreateFieldDto) {
    const newField: Field = Field.of(
      createFieldDto.field,
      createFieldDto.detailField,
      createFieldDto.userId,
    );

    try {
      const savedField = await this.fieldRepository.save(newField);

      return 'Success create new Field';
    } catch (err) {
      console.error(err);
      return 'Fail look at the console';
    }
  }

  async findAll() {
    const fields: Field[] = await this.fieldRepository.find({
      relations: {
        User: true,
      },
    });

    return fields.map(ResponseFieldDto.from);
  }

  async findOne(id: number) {
    const field: Field = await this.fieldRepository.findOne({
      where: { id },
      relations: {
        User: true,
      },
    });

    if (field === null) {
      throw new NotFoundException();
    }
    return ResponseFieldDto.from(field);
  }

  async update(id: number, updateFieldDto: UpdateFieldDto) {
    const field: Field = await this.fieldRepository.findOne({
      where: { id },
      relations: {
        User: true,
      },
    });

    if (updateFieldDto.field !== null) {
      field.editField(updateFieldDto.field);
    }

    if (updateFieldDto.detailField !== null) {
      field.editDetailedField(updateFieldDto.detailField);
    }

    await this.fieldRepository.save(field);
    return `This action updates a #${id} field`;
  }

  remove(id: number) {
    return `This action removes a #${id} field`;
  }
}
