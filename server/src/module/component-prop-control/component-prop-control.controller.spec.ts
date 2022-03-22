import { Test, TestingModule } from '@nestjs/testing';
import { ComponentPropControlController } from './component-prop-control.controller';

describe('ComponentPropControlController', () => {
  let controller: ComponentPropControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentPropControlController],
    }).compile();

    controller = module.get<ComponentPropControlController>(
      ComponentPropControlController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
