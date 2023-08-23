import { Module } from '@nestjs/common';
import { CounselingRecordService } from './counseling-record.service';
import { CounselingRecordController } from './counseling-record.controller';
import { CounselingRecord } from 'src/web-push/entities/counselingRecord.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CounselingRecord]), AuthModule],
  controllers: [CounselingRecordController],
  providers: [CounselingRecordService],
})
export class CounselingRecordModule {}
