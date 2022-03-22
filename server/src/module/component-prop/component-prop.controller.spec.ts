import { Test, TestingModule } from '@nestjs/testing';
import { ComponentPropController } from './component-prop.controller';

describe('ComponentPropController', () => {
  let controller: ComponentPropController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentPropController],
    }).compile();

    controller = module.get<ComponentPropController>(ComponentPropController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
