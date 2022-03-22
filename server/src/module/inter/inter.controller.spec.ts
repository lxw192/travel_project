import { Test, TestingModule } from '@nestjs/testing';
import { InterController } from './inter.controller';

describe('InterController', () => {
  let controller: InterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterController],
    }).compile();

    controller = module.get<InterController>(InterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
