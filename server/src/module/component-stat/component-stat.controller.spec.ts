import { Test, TestingModule } from '@nestjs/testing';
import { ComponentStatController } from './component-stat.controller';

describe('ComponentStatController', () => {
  let controller: ComponentStatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentStatController],
    }).compile();

    controller = module.get<ComponentStatController>(ComponentStatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
