import { Module } from '@nestjs/common';
import { AiInterviewService } from './ai-interview.service';
import { AiInterviewController } from './ai-interview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from 'src/web-push/entities/resume.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/web-push/entities/user.entity';
import { ResumeService } from 'src/resume/resume.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resume, User]), AuthModule],
  controllers: [AiInterviewController],
  providers: [AiInterviewService, ResumeService],
})
export class AiInterviewModule {}
