import { Test, TestingModule } from '@nestjs/testing';
import { CounselingRecordController } from './counseling-record.controller';
import { CounselingRecordService } from './counseling-record.service';

describe('CounselingRecordController', () => {
  let controller: CounselingRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CounselingRecordController],
      providers: [CounselingRecordService],
    }).compile();

    controller = module.get<CounselingRecordController>(CounselingRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
