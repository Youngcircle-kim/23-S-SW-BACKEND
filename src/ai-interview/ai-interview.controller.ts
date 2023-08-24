import { Controller, Get, Query } from '@nestjs/common';
import { AiInterviewService } from './ai-interview.service';

@Controller('ai-interview')
export class AiInterviewController {
  constructor(private readonly aiInterviewService: AiInterviewService) {}

  @Get()
  async create(@Query('role') role: string, @Query('id') userId: number) {
    const res = await this.aiInterviewService.gptInterview(role, userId);

    return await this.aiInterviewService.sendResumeToGPT(res);
  }
}
