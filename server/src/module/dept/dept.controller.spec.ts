import { Test, TestingModule } from '@nestjs/testing';
import { DeptController } from './dept.controller';

describe('Dept Controller', () => {
  let controller: DeptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeptController],
    }).compile();

    controller = module.get<DeptController>(DeptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
