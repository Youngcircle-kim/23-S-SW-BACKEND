import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JobInfoModule } from './job-info/job-info.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ResumesModule } from './resumes/resumes.module';

@Module({
  imports: [UsersModule, JobInfoModule, AppointmentsModule, ResumesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
