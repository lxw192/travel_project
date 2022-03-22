import { Test, TestingModule } from '@nestjs/testing';
import { FeatureToggleService } from './feature-toggle.service';

describe('FeatureToggleService', () => {
  let service: FeatureToggleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureToggleService],
    }).compile();

    service = module.get<FeatureToggleService>(FeatureToggleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
