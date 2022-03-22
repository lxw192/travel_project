import { Test, TestingModule } from '@nestjs/testing';
import { ControlFieldController } from './control-field.controller';

describe('ControlFieldController', () => {
  let controller: ControlFieldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControlFieldController],
    }).compile();

    controller = module.get<ControlFieldController>(ControlFieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
