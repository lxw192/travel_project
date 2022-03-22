import { Test, TestingModule } from '@nestjs/testing';
import { ComponentPropService } from './component-prop.service';

describe('ComponentPropService', () => {
  let service: ComponentPropService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentPropService],
    }).compile();

    service = module.get<ComponentPropService>(ComponentPropService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
