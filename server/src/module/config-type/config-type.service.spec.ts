import { Test, TestingModule } from '@nestjs/testing';
import { ConfigTypeService } from './config-type.service';

describe('ConfigTypeService', () => {
  let service: ConfigTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigTypeService],
    }).compile();

    service = module.get<ConfigTypeService>(ConfigTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
