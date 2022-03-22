import { Test, TestingModule } from '@nestjs/testing';
import { ComponentPropControlDataController } from './component-prop-control-data.controller';

describe('ComponentPropControlDataController', () => {
  let controller: ComponentPropControlDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentPropControlDataController],
    }).compile();

    controller = module.get<ComponentPropControlDataController>(
      ComponentPropControlDataController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
