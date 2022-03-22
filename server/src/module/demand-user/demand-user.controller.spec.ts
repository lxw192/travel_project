import { Test, TestingModule } from '@nestjs/testing';
import { DemandUserController } from './demand-user.controller';

describe('DemandUser Controller', () => {
  let controller: DemandUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemandUserController],
    }).compile();

    controller = module.get<DemandUserController>(DemandUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
