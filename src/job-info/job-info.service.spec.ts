import { Test, TestingModule } from '@nestjs/testing';
import { JobInfoService } from './job-info.service';

describe('JobInfoService', () => {
  let service: JobInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobInfoService],
    }).compile();

    service = module.get<JobInfoService>(JobInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
