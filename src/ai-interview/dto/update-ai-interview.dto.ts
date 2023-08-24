import { PartialType } from '@nestjs/mapped-types';
import { CreateAiInterviewDto } from './create-ai-interview.dto';

export class UpdateAiInterviewDto extends PartialType(CreateAiInterviewDto) {}
