import { Test, TestingModule } from '@nestjs/testing';
import { OperateLogService } from './operate-log.service';

describe('OperateLogService', () => {
  let service: OperateLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperateLogService],
    }).compile();

    service = module.get<OperateLogService>(OperateLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
