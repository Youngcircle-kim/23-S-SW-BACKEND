import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Resume } from 'src/web-push/entities/resume.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/web-push/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Resume]), AuthModule],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
