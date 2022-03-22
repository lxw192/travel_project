import { Test, TestingModule } from '@nestjs/testing';
import { ComponentPropControlDataService } from './component-prop-control-data.service';

describe('ComponentPropControlDataService', () => {
  let service: ComponentPropControlDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentPropControlDataService],
    }).compile();

    service = module.get<ComponentPropControlDataService>(
      ComponentPropControlDataService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
