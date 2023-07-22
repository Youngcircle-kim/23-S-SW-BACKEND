import { Module } from '@nestjs/common';
import { JobInfoService } from './job-info.service';
import { JobInfoController } from './job-info.controller';

@Module({
  controllers: [JobInfoController],
  providers: [JobInfoService]
})
export class JobInfoModule {}
