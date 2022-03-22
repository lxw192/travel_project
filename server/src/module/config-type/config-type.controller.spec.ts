import { Test, TestingModule } from '@nestjs/testing';
import { ConfigTypeController } from './config-type.controller';

describe('ConfigTypeController', () => {
  let controller: ConfigTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigTypeController],
    }).compile();

    controller = module.get<ConfigTypeController>(ConfigTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
