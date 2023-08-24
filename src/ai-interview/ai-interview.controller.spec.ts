import { Test, TestingModule } from '@nestjs/testing';
import { AiInterviewController } from './ai-interview.controller';
import { AiInterviewService } from './ai-interview.service';

describe('AiInterviewController', () => {
  let controller: AiInterviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiInterviewController],
      providers: [AiInterviewService],
    }).compile();

    controller = module.get<AiInterviewController>(AiInterviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
