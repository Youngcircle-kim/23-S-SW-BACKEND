import { Test, TestingModule } from '@nestjs/testing';
import { JobInfoController } from './job-info.controller';
import { JobInfoService } from './job-info.service';

describe('JobInfoController', () => {
  let controller: JobInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobInfoController],
      providers: [JobInfoService],
    }).compile();

    controller = module.get<JobInfoController>(JobInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
