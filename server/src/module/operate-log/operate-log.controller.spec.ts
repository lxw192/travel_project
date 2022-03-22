import { Test, TestingModule } from '@nestjs/testing';
import { OperateLogController } from './operate-log.controller';

describe('OperateLog Controller', () => {
  let controller: OperateLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperateLogController],
    }).compile();

    controller = module.get<OperateLogController>(OperateLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
