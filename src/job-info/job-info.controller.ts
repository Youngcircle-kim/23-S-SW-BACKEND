import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobInfoService } from './job-info.service';
import { CreateJobInfoDto } from './dto/create-job-info.dto';
import { UpdateJobInfoDto } from './dto/update-job-info.dto';

@Controller('job-info')
export class JobInfoController {
  constructor(private readonly jobInfoService: JobInfoService) {}

  @Post()
  create(@Body() createJobInfoDto: CreateJobInfoDto) {
    return this.jobInfoService.create(createJobInfoDto);
  }

  @Get()
  findAll() {
    return this.jobInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobInfoDto: UpdateJobInfoDto) {
    return this.jobInfoService.update(+id, updateJobInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobInfoService.remove(+id);
  }
}
