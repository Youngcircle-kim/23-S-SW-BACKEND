import { PartialType } from '@nestjs/mapped-types';
import { CreateJobInfoDto } from './create-job-info.dto';

export class UpdateJobInfoDto extends PartialType(CreateJobInfoDto) {}
