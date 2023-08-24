import { PartialType } from '@nestjs/mapped-types';
import { CreateCounselingRecordDto } from './create-counseling-record.dto';

export class UpdateCounselingRecordDto extends PartialType(
  CreateCounselingRecordDto,
) {}
