import { Injectable } from '@nestjs/common';
import { CreateJobInfoDto } from './dto/create-job-info.dto';
import { UpdateJobInfoDto } from './dto/update-job-info.dto';

@Injectable()
export class JobInfoService {
  create(createJobInfoDto: CreateJobInfoDto) {
    return 'This action adds a new jobInfo';
  }

  findAll() {
    return `This action returns all jobInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobInfo`;
  }

  update(id: number, updateJobInfoDto: UpdateJobInfoDto) {
    return `This action updates a #${id} jobInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobInfo`;
  }
}
