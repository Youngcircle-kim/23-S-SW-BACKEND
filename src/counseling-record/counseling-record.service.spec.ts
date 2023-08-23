import { Test, TestingModule } from '@nestjs/testing';
import { CounselingRecordService } from './counseling-record.service';

describe('CounselingRecordService', () => {
  let service: CounselingRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CounselingRecordService],
    }).compile();

    service = module.get<CounselingRecordService>(CounselingRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
